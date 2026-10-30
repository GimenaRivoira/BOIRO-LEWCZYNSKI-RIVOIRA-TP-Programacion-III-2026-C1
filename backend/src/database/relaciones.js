const sequelize = require("./sequelize");
const Producto = require("../productos/producto.model");
const Venta = require("../ventas/venta.model");
const ProductosVenta = require("./Productos.Venta.model");

Producto.belongsToMany(Venta, { through: ProductosVenta });
Venta.belongsToMany(Producto, { through: ProductosVenta });

async function syncMuchos() {
  await sequelize.sync({ alter: true });
}

syncMuchos();

module.exports = { Producto, Venta, ProductosVenta };
