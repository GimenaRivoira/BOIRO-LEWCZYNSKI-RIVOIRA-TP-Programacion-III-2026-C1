const express = require("express");
const {
  crearProductoVenta,
  traerdetalleventa,
  crearVenta,
  traerVenta,
  traerVentaporid,
} = require("./venta.controller");

const ventasRouter = express.Router();

ventasRouter.post("/creardetalle", crearProductoVenta);

ventasRouter.get("/detalle/:id", traerdetalleventa);

ventasRouter.post("/crear", crearVenta);

ventasRouter.get("/", traerVenta);

ventasRouter.get("/:id", traerVentaporid);

module.exports = ventasRouter;
