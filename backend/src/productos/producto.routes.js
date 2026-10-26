const express = require("express");
const { listarProductos } = require("./producto.controller");

const productoRouter = express.Router();

productoRouter.get("/", listarProductos);

module.exports = productoRouter;