const btnfinalizar = document.getElementById("btnterminar");
document.addEventListener("DOMContentLoaded", () => {
  cargarTicket();
});

async function cargarTicket() {
  const idVenta = localStorage.getItem("idVenta");

  if (!idVenta) {
    console.log("error al cargar venta");
    return;
  }

  try {
    const respuestaVenta = await fetch(
      "http://localhost:3000/ventas/" + idVenta,
    );

    const venta = await respuestaVenta.json();

    if (!respuestaVenta.ok) {
      throw new Error(venta.mensaje || "No se pudo encontrar la venta");
    }

    const respuestaDetalle = await fetch(
      "http://localhost:3000/ventas/detalle/" + idVenta,
    );

    const detalles = await respuestaDetalle.json();

    if (!respuestaDetalle.ok) {
      throw new Error("error en el detalle compra");
    }

    const contenidoticket = document.getElementById("contenidoTicket");

    contenidoticket.textContent = "";

    const nombreCliente = document.createElement("p");
    nombreCliente.textContent = "Cliente: " + venta.nombre_cliente;

    contenidoticket.appendChild(nombreCliente);

    const fecha = document.createElement("p");
    fecha.textContent = "Fecha: " + venta.fecha;

    contenidoticket.appendChild(fecha);

    const tituloDetalle = document.createElement("h5");
    tituloDetalle.className = "mt-4 mb-3";
    tituloDetalle.textContent = "Detalle de tu compra";

    contenidoticket.appendChild(tituloDetalle);

    detalles.forEach((detalle) => {
      const nombre = document.createElement("p");
      nombre.textContent = detalle.Producto.nombre;

      const cantidad = document.createElement("p");
      cantidad.textContent = "Cantidad: " + detalle.cantidad;

      const precio = document.createElement("p");
      precio.textContent = "Precio unitario: $" + detalle.precio_unitario;

      const subtotal = document.createElement("p");
      subtotal.textContent =
        "Subtotal: $" + detalle.precio_unitario * detalle.cantidad;

      contenidoticket.appendChild(nombre);
      contenidoticket.appendChild(cantidad);
      contenidoticket.appendChild(precio);
      contenidoticket.appendChild(subtotal);

      const separador = document.createElement("hr");
      contenidoticket.appendChild(separador);
    });

    document.getElementById("total").textContent = "Total: $" + venta.total;
  } catch (error) {
    console.error("No se pudo cargar el ticket:", error.message);
  }
}
(btnfinalizar.addEventListener("click"),
  async (ev) => {
    localStorage.removeItem("nombreCliente");
  });
