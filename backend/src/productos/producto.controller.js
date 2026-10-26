const path = require("path");
const { Producto } = require("./producto.model");

const listarProductos = async (req, res) => {
    await res.sendFile(path.join(__dirname, "productos.html"));
    console.log("Metodo findAll para listar ");
}

module.exports = {
    listarProductos
}