const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../database/sequelize");

const Producto = sequelize.define(
  "Producto",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }, //esto hay que checkear si se puede elegir exactamente entre dos palabras.
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: INTEGER,
      allowNull: false,
    },
    stock: {
      type: INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.BLOB,
    },
  },
  {
    tableName: "",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Producto;
