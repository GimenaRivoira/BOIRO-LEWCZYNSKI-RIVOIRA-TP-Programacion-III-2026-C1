const path = require("path");
const { Producto } = require("../database/relaciones");

/*const listarProductos = async (req, res) => {
  await res.sendFile(path.join(__dirname, "productos.html"));
  console.log("Metodo findAll para listar ");
};
*/
module.exports = {
  listarProductos,
};
