const path = require("path");
const { traerPorTematica } = require("../productos/producto.model");

const mostrarInicio = async (req, res) => {
    await res.sendFile(path.join(__dirname, "inicio.html"));
}

const traerProductos = async (req, res) => {
    res.send(await traerPorTematica())
}

module.exports = {
    mostrarInicio,
    traerProductos
}