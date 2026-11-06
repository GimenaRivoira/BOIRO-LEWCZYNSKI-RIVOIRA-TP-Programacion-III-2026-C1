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

productoRouter.get("/", traerproductos);
productoRouter.get("/:id", traerprodporid);
productoRouter.post("/", upload.single("imagen"), crearprod);
productoRouter.put("/:id", upload.single("imagen"), modficarprodporid);
productoRouter.delete("/:id", eliminarprodporid);

module.exports = productoRouter;
