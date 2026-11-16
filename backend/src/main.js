//importaciones
const express = require("express");
const cors = require("cors");
const path = require("path");
const z = require('zod');

//Rutas
const productoRouter = require("./productos/producto.routes");
const ventasRouter = require("./ventas/venta.routes");
const adminRouter = require("./Admins/admin.routes");

const sequelize = require("./database/sequelize");
const { Producto, Venta } = require("./database/relaciones");

//crear la instancia
const app = express();

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

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
app.use("/admin", adminRouter);
app.use("/public", express.static("public"));

//conectar la instancia al puerto elegido
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`el server se levanto correctamente en el puerto ${PORT}`),
);

//middleware
app.use((err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json(err.issues);
  }

  res.status(500).send({mensaje: "Error desconocido"});
})
