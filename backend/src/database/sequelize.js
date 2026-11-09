process.loadEnvFile();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_1);

module.exports = sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Conexion a MySQL ok"))
  .catch((error) => console.log("Error de conexion:", error));
