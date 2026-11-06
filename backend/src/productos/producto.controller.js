const path = require("path");

const { Producto } = require("../database/relaciones");

const listarProductos = async (req, res) => {
  //Aca va la logica para listar los productos con findAll
};
const crearprod = async (req, res) => {
  try {
    const { nombre, tipo, tematica, precio, stock, descripcion} = req.body;

  // Aca va la URL de la imagen subida para guardarla en la base de datos :)
    const imagen = `http://localhost:3000/imagenes/${req.file.filename}`;

    const productoCreado = await Producto.create({
      nombre,
      tipo,
      tematica,
      precio,
      stock,
      descripcion,
      imagen,
    });
    return res.status(201).json({
      ok: true,
      mensaje: "Producto creado ",
      producto: productoCreado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear el producto",
      error: error.message,
    });
  }
};

const traerproductos = async (req, res) => {
  try {
    const tematica = req.query.tematica;

    let productos;
    if (tematica) {
      productos = await Producto.findAll({ where: {tematica: tematica}})
    } else {
      productos = await Producto.findAll({ where: {order: [["nombre", "ASC"]]}})
    }

    res.json(productos);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error al listar los productos",
      error: error.message,
    });
  }
};
const traerprodporid = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({
        ok: false,
        mensaje: "producto no encontrado",
      });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "error al traer el producto por id",
      error: error.message,
    });
  }
};
const modficarprodporid = async (req, res) => {
  try {
    const { nombre, tipo, precio, stock, descripcion} = req.body;
    const { id } = req.params;
    let datosAModificar = {};
    if (nombre) {
      datosAModificar.nombre = nombre;
    }

    if (tipo) {
      datosAModificar.tipo = tipo;
    }
    if (precio !== undefined) {
      datosAModificar.precio = precio;
    }
    if (stock !== undefined) {
      datosAModificar.stock = stock;
    }
    if (descripcion) {
      datosAModificar.descripcion = descripcion;
    }
    if (req.file) {
      datosAModificar.imagen = `http://localhost:3000/imagenes/${req.file.filename}`; 
    }
    
    const modficado = await Producto.update(datosAModificar, { where: { id } });

    res.json(modficado);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "error al modficar x id",
      error: error.message,
    });
  }
};
const eliminarprodporid = async (req, res) => {
  try {
    const eliminado = await Producto.destroy({ where: { id: req.params.id } });
    res.json(eliminado);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "error al eliminar producto",
      error: error.message,
    });
  }
};

module.exports = {
  crearprod,
  listarProductos,
  traerprodporid,
  traerproductos,
  modficarprodporid,
  eliminarprodporid,
};
