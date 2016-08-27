const prod = require('./config.prod');
const staging = require('./config.staging');

const dev = {

};

module.exports = (function getConfig() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return Object.assign({}, dev, prod);
    case 'staging':
      return Object.assign({}, dev, prod, staging);
    case 'pull-request':
    default: return dev;
  }
}());