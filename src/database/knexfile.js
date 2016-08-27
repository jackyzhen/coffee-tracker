const appRoot = require('app-root-path');

module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'hello',
      database: 'coffee-tracker',
    },
  },
  'pull-request': {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  migrations: {
    directory: `${appRoot}/src/database/migrations`,
  },
  seeds: {
    directory: `${appRoot}/src/database/seeds`,
  },
};