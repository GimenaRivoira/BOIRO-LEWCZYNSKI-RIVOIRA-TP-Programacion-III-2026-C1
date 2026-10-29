const sequelize = requiere("./sequelize");
const Producto = requiere("../productos/productos.model");
const Venta = requiere("../venta/venta.model");
const ProductosVenta = requiere("./ProductosVenta.model");

Producto.belongsToMany(Venta, { through: ProductosVenta });
Venta.belongsToMany(Producto, { through: ProductosVenta });

async function syncMuchos() {
  await sequelize.sync({ alter: true });
}

syncMuchos();

module.exports = { Producto, Venta, ProductosVenta };
