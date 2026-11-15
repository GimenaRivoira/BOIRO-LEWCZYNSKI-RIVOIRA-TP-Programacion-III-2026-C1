const express = require("express");
const multer = require("multer");
const upload = require("../common/multer");
const { validarAdmin } = require("./admin.middleware");
const { crearAdmin, mostrarLogin, procesarLogin, mostrarDashboard, mostrarPostForm, crearProducto, darDeBaja, activar } = require("./admin.controller");

const adminRouter = express.Router();

//APIs
adminRouter.post("/usuarios", validarAdmin, crearAdmin);

//VISTAS EJS
adminRouter.get("/login", mostrarLogin);
adminRouter.post("/login", multer().none(), procesarLogin);

adminRouter.get("/dashboard", mostrarDashboard);

adminRouter.get("/productos/nuevo", mostrarPostForm);
adminRouter.post("/productos", upload.single("imagen"), crearProducto);

adminRouter.post("/productos/:id/baja", darDeBaja);
adminRouter.post("/productos/:id/activar", activar);

module.exports = adminRouter;