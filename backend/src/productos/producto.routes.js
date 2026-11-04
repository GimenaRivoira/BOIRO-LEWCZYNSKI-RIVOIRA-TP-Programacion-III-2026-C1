const express = require("express");
const {
  crearprod,
  traerprodporid,
  traerproductos,
  modficarprodporid,
  eliminarprodporid,
} = require("./producto.controller");

const productoRouter = express.Router();

productoRouter.get("/", traerproductos);
productoRouter.get("/:id", traerprodporid);
productoRouter.post("/", crearprod);
productoRouter.put("/:id", modficarprodporid);
productoRouter.get("/:id", eliminarprodporid);

module.exports = productoRouter;
