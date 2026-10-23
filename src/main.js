//importar el framework
const express = reuiere("express");
const productoRouter = require("./productos/producto.routes");
const detalle_ventasRouter = require("./detalle_ventas/detalle.routes");
const usuarioRouter = require("./Usuario/usuario.routes");

//const sequelize = require("./database/sequelize");

//crear la instancia
const app = express();

//configuraciones extra
app.use(express.json());
app.use("/imagenes", express.static("img")); // ejemplo clase

app.use("/public", express.static("public"));

//definir rutas
//app.use("/productos", productoRouter);
//app.use("/detalle_ventas", detalle_ventasRouter);
//app.use("/Usuario", usuarioRouter);

//conectar la instancia al puerto elegido
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`el server se/:id levanto correctamente en el puerto ${PORT}`),
);
