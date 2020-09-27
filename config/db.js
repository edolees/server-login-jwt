// const knex = require('knex');
// const knexfile = require('../knexfile');

const env = process.env.NODE_ENV || 'development';
// const configOptions = knexfile[env]

module.exports = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	db: process.env.DB_NAME,
};
