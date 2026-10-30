const express = require("express");
const { traerDestacados } = require("./inicio.controller");

const inicioRouter = express.Router();

inicioRouter.get("/", traerDestacados);

module.exports = inicioRouter;