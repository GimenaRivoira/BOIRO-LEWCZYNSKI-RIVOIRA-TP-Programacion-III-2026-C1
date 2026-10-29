const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("./sequelize");

//falta checkear al crear que las fk  aparezca de manera correcta.
const ProductosVenta = sequelize.define(
  {
    id_detalle: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      ype: INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "estudiantes",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = ProductosVenta;
