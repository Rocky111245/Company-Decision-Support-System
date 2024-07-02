//it packages the sequelize and database together 

const { Sequelize } = require('sequelize');
const dbConfig = require('./config/database');

const connection = new Sequelize(dbConfig);

module.exports = connection; //it exports this connection, so we can use this in any part of our react project.