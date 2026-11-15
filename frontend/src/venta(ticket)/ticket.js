const btnfinalizar = document.getElementById("btnterminar");
const btnpdf = document.getElementById("btnpdf");
let ventaActual;
let detallesActuales = [];
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
    ventaActual = venta;

    if (!respuestaVenta.ok) {
      throw new Error(venta.mensaje || "No se pudo encontrar la venta");
    }

    const respuestaDetalle = await fetch(
      "http://localhost:3000/ventas/detalle/" + idVenta,
    );

    const detalles = await respuestaDetalle.json();
    detallesActuales = detalles;

    if (!respuestaDetalle.ok) {
      throw new Error("error en el detalle compra");
    }

    const contenidoticket = document.getElementById("contenidoTicket");

    contenidoticket.textContent = "";

    const nombreCliente = document.createElement("p");
    nombreCliente.textContent = "Cliente: " + venta.nombre_cliente;

    contenidoticket.appendChild(nombreCliente);

    const fecha = document.createElement("p");
    fecha.textContent =
      "Fecha: " + new Date(venta.fecha).toLocaleDateString("es-AR");

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
btnfinalizar.addEventListener("click", () => {
  localStorage.removeItem("nombreCliente");
  ventaActual = null;
  detallesActuales = [];
});

function generarPDF() {
  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  let ubicaciontexto = 20;

  doc.setFontSize(22);
  doc.text("FLOREA", 105, ubicaciontexto, { align: "center" });

  ubicaciontexto += 15;

  doc.setFontSize(12);
  doc.text("¡Gracias por tu compra!", 105, ubicaciontexto, {
    align: "center",
  });

  ubicaciontexto += 15;

  doc.setFontSize(12);

  doc.text("Cliente: " + ventaActual.nombre_cliente, 20, ubicaciontexto);

  ubicaciontexto += 10;

  doc.text(
    "Fecha: " + new Date(ventaActual.fecha).toLocaleDateString("es-AR"),
    20,
    ubicaciontexto,
  );

  ubicaciontexto += 15;

  doc.setFontSize(15);
  doc.text("Detalle de tu compra", 20, ubicaciontexto);

  ubicaciontexto += 12;

  doc.setFontSize(11);

  detallesActuales.forEach((detalle) => {
    doc.text("Producto: " + detalle.Producto.nombre, 20, ubicaciontexto);

    ubicaciontexto += 7;

    doc.text("Cantidad: " + detalle.cantidad, 20, ubicaciontexto);

    ubicaciontexto += 7;

    doc.text(
      "Precio unitario: $" + detalle.precio_unitario,
      20,
      ubicaciontexto,
    );

    ubicaciontexto += 7;

    doc.text(
      "Subtotal: $" + detalle.precio_unitario * detalle.cantidad,
      20,
      ubicaciontexto,
    );

    ubicaciontexto += 12;
  });

  doc.setFontSize(15);

  doc.text("Total: $" + ventaActual.total, 20, ubicaciontexto);

  doc.save("Ticket_FLOREA.pdf");
}
btnpdf.addEventListener("click", () => {
  if (!ventaActual || detallesActuales.length === 0) {
    console.log("No se pudo generar el PDF");
    return;
  }

  generarPDF();
});
