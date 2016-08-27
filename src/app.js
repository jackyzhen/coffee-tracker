const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const auth = require('basic-auth');
const sqlClient = require('./database/client');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));

app.use((req, res, next) => {
  const credentials = auth(req);
  return sqlClient('credential')
    .select('username', 'password')
    .first()
    .then(result => {
      if (!credentials || credentials.name !== result.username || credentials.pass !== result.password) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.end('Access denied');
      } else {
        return next();
      }
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;