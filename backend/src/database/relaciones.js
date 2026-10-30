const sequelize = require("./sequelize");
const Producto = require("../productos/productos.model");
const Venta = require("../venta/venta.model");
const ProductosVenta = require("./ProductosVenta.model");

Producto.belongsToMany(Venta, { through: ProductosVenta });
Venta.belongsToMany(Producto, { through: ProductosVenta });

async function syncMuchos() {
  await sequelize.sync({ alter: true });
}

syncMuchos();

module.exports = { Producto, Venta, ProductosVenta };
