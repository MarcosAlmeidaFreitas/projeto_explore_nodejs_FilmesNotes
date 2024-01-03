const knex = require('knex');
const path = require('path');

const config = require("../../../knexfile");
const connection = knex(config.development);

module.exports = connection;