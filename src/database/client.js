const config = require('./knexfile');
const knex = require('knex');

const environment = process.env.NODE_ENV || 'local';

const knexConfigured = knex(config[environment]);
module.exports = knexConfigured;

knexConfigured.migrate.latest(config.migrations);