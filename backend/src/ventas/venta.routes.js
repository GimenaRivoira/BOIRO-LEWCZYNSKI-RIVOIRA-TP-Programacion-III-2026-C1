const express = require("express");
const { crearProductoVenta } = require("./venta.controller");
const ventasRouter = express.Router();
ventasRouter.post("/", crearProductoVenta);
module.exports = ventasRouter;
