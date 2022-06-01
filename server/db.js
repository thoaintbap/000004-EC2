const { Sequelize } = require('sequelize');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  // pool: {
  //   max: 100,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000,
  // },
});

module.exports = sequelize;
