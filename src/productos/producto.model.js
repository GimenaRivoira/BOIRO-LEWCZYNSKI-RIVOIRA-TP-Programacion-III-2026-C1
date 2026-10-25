const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
/* 
const Producto = sequelize.define(
    "Producto",
    { aca estaria la definicion de columnas dentro de mi tabla }
); */

const traerPorTematica = async () => {
    console.log("La logica para traer x tematica en el inicio");
}

module.exports = {
    /* Producto, */
    traerPorTematica
}