const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema');
const auth = require('basic-auth');
const sqlClient = require('../database/client');

const app = express();

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
      next();
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

// serve static files
app.use(express.static('dist', {
  cacheControl: false,
}));

// redirect all 404s to index.html
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'), {
    cacheControl: false,
  });
});

// error handling
app.use((err, req, res, next) => {
  console.error('ERROR: %s %s - %s', req.method, req.url, err.message);
  err.stack && console.error(err.stack);
  res.status(500).json(err);
});

// starting listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`coffee tracker server listening on ${port}.`);
});