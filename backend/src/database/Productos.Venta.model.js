const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("./sequelize");

//falta checkear al crear que las fk  aparezca de manera correcta.
const ProductosVenta = sequelize.define(
  "ProductosVenta",
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
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "productos_ventas",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = ProductosVenta;
