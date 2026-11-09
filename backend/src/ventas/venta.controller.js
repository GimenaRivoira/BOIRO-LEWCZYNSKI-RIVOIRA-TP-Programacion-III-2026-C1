const { Producto, Venta, ProductosVenta } = require("../database/relaciones");

const crearProductoVenta = async (req, res) => {
  try {
    const { idProducto, idVenta, cantidad } = req.body;

    const producto = await Producto.findByPk(idProducto);
    const venta = await Venta.findByPk(idVenta);

    if (!producto || !venta) {
      return res.status(404).json({
        ok: false,
        mensaje: "Producto o venta no encontrados",
      });
    }

    if (!Number.isInteger(Number(cantidad)) || Number(cantidad) < 1) {
      return res.status(400).json({
        ok: false,
        mensaje: "La cantidad debe ser mayor a cero",
      });
    }

    const relacion = await ProductosVenta.create({
      ProductoId: idProducto,
      VentaId: idVenta,
      cantidad,
      precio_unitario: producto.precio,
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Producto agregado a la venta",
      datos: relacion,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear la relacion",
      error: error.message,
    });
  }
};
const traerdetalleventa = async (req, res) => {
  try {
    const { id } = req.params;

    const detalle = await ProductosVenta.findAll({
      where: { VentaId: id },
      include: [{ model: Producto }],
    });

    res.json(detalle);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error al traer el detalle de la venta",
      error: error.message,
    });
  }
};
const crearVenta = async (req, res) => {
  //requiere que le envien un total desde el lado cliente.
  try {
    const { total } = req.body;

    const ventaCreada = await Venta.create({
      fecha: new Date(),
      total,
    });

    return res.status(201).json({
      ok: true,
      mensaje: "Venta creada correctamente",
      venta: ventaCreada,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error al crear la venta",
      error: error.message,
    });
  }
};
const traerVentaporid = async (req, res) => {
  try {
    const { id } = req.params;

    const venta = await Venta.findByPk(id);

    if (!venta) {
      return res.status(404).json({
        ok: false,
        mensaje: "Venta no encontrada",
      });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error al traer la venta",
      error: error.message,
    });
  }
};
const traerVenta = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      order: [["fecha", "DESC"]],
    });

    res.json(ventas);
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Error al listar ventas",
      error: error.message,
    });
  }
};

module.exports = {
  crearProductoVenta,
  traerdetalleventa,
  crearVenta,
  traerVenta,
  traerVentaporid,
};
