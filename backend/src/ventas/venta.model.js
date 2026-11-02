const { INTEGER, STRING, DATE } = require("sequelize");
const sequelize = require("../database/sequelize");

const Ventas = sequelize.define("Ventas", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_cliente: {
    type: STRING, 
    allowNull:false
  },
  fecha: {
    type: DATE,
  },
  total: {
    type: INTEGER,
    allowNull: false,
  },
});
module.exports = Ventas;
