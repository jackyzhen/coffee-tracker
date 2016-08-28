const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema');
const auth = require('basic-auth');
const sqlClient = require('../database/client');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./dev.config');

const compiler = webpack(webpackConfig);
const host = 'localhost';
const port = 4001;
const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.use((req, res, next) => {
  const credentials = auth(req);
  return sqlClient('credential')
    .select('username', 'password')
    .first()
    .then(result => {
      if (!credentials || credentials.name !== result.username || credentials.pass !== result.password) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        return res.end('Access denied');
      }
      return next();
    });
});

app.use('/graphql', (req, res, next) => {
  return graphqlHTTP((req, res) =>
    ({
      schema,
      graphiql: true,
      pretty: true,
      context: {
        response: res,
        dbClient: sqlClient,
      },
    }))(req, res);
});

app.use((req, res) => {
  const index = path.resolve(__dirname, 'index.html');
  res.sendFile(index);
});

app.use((err, req, res, next) => {
  console.error('ERROR: %s %s - %s', req.method, req.url, err.message);
  err.stack && console.error(err.stack);
  res.status(500).json(err);
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});