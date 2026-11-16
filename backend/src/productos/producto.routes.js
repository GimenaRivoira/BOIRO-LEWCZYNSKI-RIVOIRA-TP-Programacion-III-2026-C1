const express = require("express");
const upload = require("../common/multer");
const {
  crearprod,
  traerprodporid,
  traerproductos,
  modficarprodporid,
  eliminarprodporid,
} = require("./producto.controller");

const productoRouter = express.Router();

const {validarID} = require("../common/middlewares");
const { crearProductoMW, modificarProductoMW } = require("./producto.middleware");

productoRouter.get("/", traerproductos);
productoRouter.get("/:id", validarID, traerprodporid);
productoRouter.post("/", upload.single("imagen"), crearProductoMW, crearprod);
productoRouter.put("/:id", validarID, upload.single("imagen"), modificarProductoMW, modficarprodporid);
productoRouter.delete("/:id", validarID, eliminarprodporid);

module.exports = productoRouter;
