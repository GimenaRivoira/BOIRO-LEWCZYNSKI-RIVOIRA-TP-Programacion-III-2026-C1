const crearProductoVenta = async (req, res) => {
  try {
    const { idProducto, idVenta, cantidad } = req.body;

    const producto = await Producto.findByPk(idProducto);

    const venta = await Venta.findByPk(idVenta);

    if (!producto || !venta) {
      return res.status(404).send({
        ok: false,
        mensaje: "Producto o venta no encontrados",
      });
    }

    if (!Number.isInteger(Number(cantidad)) || Number(cantidad) < 1) {
      return res.status(400).send({
        ok: false,
        mensaje: " debe ser mayor a cero",
      });
    }

    const relacion = await ProductosVenta.create({
      ProductoId: idProducto,
      VentaId: idVenta,
      cantidad: cantidad,
      precio_unitario: producto.precio,
    });

    return res.status(201).send({
      ok: true,
      mensaje: "Producto agregado a la venta",
      datos: relacion,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error al crear la relacion",
      error: error.message,
    });
  }
};

module.exports = {
  crearProductoVenta,
};
