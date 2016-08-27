const express = require('express');
const graphqlHTTP = require('express-graphql');
// const schema = require('./graphql/schema');
const auth = require('basic-auth');
const sqlClient = require('./database/client');

const app = express();

app.use((req, res) => {
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
        res.end('Access granted');
      }
    });
});

// app.use('/graphql/:userId?/:admin?', (req, res, next) => {
//   // Replace | with - so that our userIds look a bit cleaner, ie auth0-5774b8ec1880f7c94364adbb
//   let auth0UserId = req.user && req.user.sub.replace('|', '-');
//   let admin = req.user && req.user.userRoles && req.user.userRoles.includes('admin');
//   if (!auth0UserId && process.env.NODE_ENV !== 'production' && req.params.userId) {
//     auth0UserId = req.params.userId.replace('|', '-');
//     admin = req.params.admin;
//   }
//   // every request should have a token and auth0 user associated.
//   // If it is an existing user it will have firebase and timekit data associated
//   // We try to pre-fetch that data and setup the timekit client and save it in the context to be used by all graphql queries

//   if (!auth0UserId) {
//     let err = null;
//     if (process.env.NODE_ENV !== 'production') {
//       err = new Error(`You need to provide a valid jwt token as part of request header
//       which has a userId (so you can't use graphiql). OR use /graphql/:userId to fake a userId`);
//     } else {
//       err = new Error('Unauthorized');
//     }
//     err.status = 401;
//     return next(err);
//   }
//   return graphqlHTTP((req, res) =>
//     ({
//       schema,
//       graphiql: true,
//       pretty: true,
//       context: {
//         auth0UserId,
//         jwt: req.headers && req.headers.authorization && utils.getJWTToken(req),
//         response: res,
//         dbClient: sqlClient,
//         admin,
//       },
//       //formatError: error => JSON.stringify(error),
//     }))(req, res);
// });

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