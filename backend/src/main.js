//importaciones
const express = require("express");
const cors = require("cors");

//Rutas
const productoRouter = require("./productos/producto.routes");
const detalle_ventasRouter = require("./ventas/venta.routes");
const usuarioRouter = require("./Admins/admin.routes");

const sequelize = require("./database/sequelize");

//crear la instancia
const app = express();

//configuraciones extra
app.use(express.json());
app.use(cors());
app.use("/imagenes", express.static("img")); // ejemplo clase

//Definicion de rutas
app.use("/public", express.static("public"));
app.use("/productos", productoRouter);

//definir rutas
//app.use("/detalle_ventas", detalle_ventasRouter);
//app.use("/Usuario", usuarioRouter);

//conectar la instancia al puerto elegido
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`el server se/:id levanto correctamente en el puerto ${PORT}`),
);
