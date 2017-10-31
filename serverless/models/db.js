const pg = require('pg');
const config = require('../knexfile.js');
const knex = require('knex');

const dbInit = () => {
  return knex(config);
};

module.exports = dbInit;
