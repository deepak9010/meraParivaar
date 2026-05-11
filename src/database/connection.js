const { Sequelize } = require('sequelize');
const config = require('../config');
const databaseConfig = require('../config/database');

const env = config.env || 'development';
const dbConfig = databaseConfig[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: dbConfig.define,
    pool: dbConfig.pool,
  }
);

module.exports = sequelize;
