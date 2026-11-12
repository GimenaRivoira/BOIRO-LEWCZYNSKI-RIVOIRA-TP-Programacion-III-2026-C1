//importaciones
const express = require("express");
const cors = require("cors");
const path = require("path");

//Rutas
const productoRouter = require("./productos/producto.routes");
const ventasRouter = require("./ventas/venta.routes");
//const usuarioRouter = require("./Admins/admin.routes");

const sequelize = require("./database/sequelize");
const { Producto, Venta } = require("./database/relaciones");

//crear la instancia
const app = express();

//configuraciones extra
app.use(express.json());
app.use(
  cors({ origin: "http://127.0.0.1:5500", allowedHeaders: "content-type" }),
);
app.use(express.static(path.join(__dirname, "../../frontend")));
app.use("/imagenes", express.static("img")); // ejemplo clase

//Definicion de rutas
app.use("/productos", productoRouter);
app.use("/ventas", ventasRouter);
app.use("/public", express.static("public"));

//conectar la instancia al puerto elegido
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`el server se levanto correctamente en el puerto ${PORT}`),
);
