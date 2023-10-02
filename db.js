const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

sequelize = new Sequelize({
  database: process.env.PROD_DB_DATABASE,
  username: process.env.PROD_DB_USERNAME,
  password: process.env.PROD_DB_PASSWORD,
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  dialect: process.env.PROD_DB_DIALECT,
  logging: false,
  define: {
    timestamps: true,
  },
  timezone: "-04:00",
});

module.exports = sequelize;
