const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWORD_DB, {
  host: process.env.HOSTNAME,
  dialect: 'mysql'
});

module.exports = connection;