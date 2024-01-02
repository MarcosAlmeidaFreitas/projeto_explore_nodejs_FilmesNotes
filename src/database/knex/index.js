const knex = require('knex');
const path = require('path');

const config = path.resolve(__dirname, "knexfile.js");

const connection = knex(config.development);

module.exports = connection;