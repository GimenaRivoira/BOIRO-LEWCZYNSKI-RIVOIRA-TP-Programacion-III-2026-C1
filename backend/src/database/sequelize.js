process.loadEnvFile();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_1, {
  dialect: "mysql",
});

module.exports = sequelize;
