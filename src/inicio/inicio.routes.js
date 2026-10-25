const express = require("express");
const { mostrarInicio, traerProductos } = require("./inicio.controller");

const inicioRouter = express.Router();

inicioRouter.get("/", mostrarInicio)
inicioRouter.get("/productos", traerProductos)

module.exports = inicioRouter;