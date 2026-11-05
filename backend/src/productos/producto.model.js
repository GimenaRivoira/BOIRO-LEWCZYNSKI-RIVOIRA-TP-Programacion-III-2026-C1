const { DataTypes, INTEGER, ENUM } = require("sequelize");
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
    },
    tipo: {
      type: DataTypes.ENUM("flores", "velas"),
      allowNull: false,
    },
    tematica: {
      type: DataTypes.ENUM("halloween", "navidad", "general"),
      allowNull: false,
      defaultValue: "general"
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
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "productos",
    timestamps: true,
    paranoid: true,
  },
);

module.exports = Producto;
