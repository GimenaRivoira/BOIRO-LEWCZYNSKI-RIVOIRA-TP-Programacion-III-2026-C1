const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../database/sequelize");

const Ventas = sequelize.define("Ventas", {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
  },
  total: {
    type: INTEGER,
    allowNull: false,
  },
});
module.exports = Ventas;
