document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();

  const botonFinalizar = document.getElementById("botonFinalizar");

  botonFinalizar.addEventListener("click", () => {
    finalizarCompra();
  });
});

function mostrarCarrito() {
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

  let carrito = [];

  if (carritoGuardado) {
    carrito = carritoGuardado;
  }

  const contenedor = document.getElementById("listaCarrito");

  contenedor.textContent = "";

  if (carrito.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "El carrito está vacío";

    contenedor.appendChild(mensaje);

    document.getElementById("totalCarrito").textContent = 0;
    return;
  }

  let total = 0;

  carrito.forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const tarjeta = document.createElement("div");
    tarjeta.className = "card mb-3";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const nombre = document.createElement("h5");
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = "Precio: $" + producto.precio;

    const controles = document.createElement("div");
    controles.className = "d-flex align-items-center gap-2";

    const botonDisminuir = document.createElement("button");
    botonDisminuir.className = "btn btn-outline-secondary";
    botonDisminuir.textContent = "-";

    botonDisminuir.addEventListener("click", () => {
      disminuirCantidad(producto.id);
    });

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.cantidad;

    const botonAumentar = document.createElement("button");
    botonAumentar.className = "btn btn-outline-secondary";
    botonAumentar.textContent = "+";

    botonAumentar.addEventListener("click", () => {
      aumentarCantidad(producto.id);
    });

    const textoSubtotal = document.createElement("p");
    textoSubtotal.className = "mt-2";
    textoSubtotal.textContent = "Subtotal: $" + subtotal;

    const botonEliminar = document.createElement("button");
    botonEliminar.className = "btn btn-danger";
    botonEliminar.textContent = "Eliminar";

    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });

    controles.appendChild(botonDisminuir);
    controles.appendChild(cantidad);
    controles.appendChild(botonAumentar);

    cuerpo.appendChild(nombre);
    cuerpo.appendChild(precio);
    cuerpo.appendChild(controles);
    cuerpo.appendChild(textoSubtotal);
    cuerpo.appendChild(botonEliminar);

    tarjeta.appendChild(cuerpo);

    contenedor.appendChild(tarjeta);
  });

  document.getElementById("totalCarrito").textContent = total;

  function aumentarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    const producto = carrito.find((p) => p.id === id);

    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
    } else {
      console.error("No se pudo cargar el ticket:", error.message);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
  }

  function disminuirCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    const producto = carrito.find((p) => p.id === id);

    if (producto.cantidad > 1) {
      producto.cantidad--;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
  }

  function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    carrito = carrito.filter((p) => p.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
  }
}

function createModal({
  title = "Modal Title",
  body = "Modal Body",
  footer = "",
  size = "md",
}) {
  const modalId = "dynamicModal";

  const modalHtml = `
    <div class="modal fade" id="${modalId}" tabindex="-1"
      aria-labelledby="${modalId}Label" aria-hidden="true">

      <div class="modal-dialog modal-${size} modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="${modalId}Label">
              ${title}
            </h5>

            <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>

          <div class="modal-body">
            ${body}
          </div>

          <div class="modal-footer">
            ${footer}
          </div>

        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modalElemento = document.getElementById(modalId);

  const modal = new bootstrap.Modal(modalElemento);

  modal.show();

  modalElemento.addEventListener("hidden.bs.modal", function () {
    modalElemento.remove();
  });
}

function finalizarCompra() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (!carrito || carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  createModal({
    title: "Confirmar compra",

    body: `
      <p class="text-center">
        ¿Estás seguro de que deseas finalizar tu compra?
      </p>
      <p class="text-center">
        ¡Gracias por elegirnos!
      </p>
    `,

    footer: `
      <button type="button" class="btn btn-secondary"
        data-bs-dismiss="modal">
        Cancelar
      </button>

      <button type="button" class="btn btn-success"
        onclick="confirmarCompra()">
        Confirmar compra
      </button>
    `,
  });
}

async function confirmarCompra() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  const nombreCliente = localStorage.getItem("nombreCliente");

  if (!carrito || carrito.length === 0) {
    console.log("error carrito");
    return;
  }

  if (!nombreCliente) {
    console.log("No se encontro cliente.");
    return;
  }

  try {
    let total = 0;

    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });

    const respuestaVenta = await fetch("http://localhost:3000/ventas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_cliente: nombreCliente,
        total: total,
      }),
    });

    const datosVenta = await respuestaVenta.json();

    if (!respuestaVenta.ok) {
      throw new Error(datosVenta.mensaje || "Error al crear la venta");
    }

    const idVenta = datosVenta.venta.id;

    for (const producto of carrito) {
      const respuestaDetalle = await fetch(
        "http://localhost:3000/ventas/creardetalle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idProducto: producto.id,
            idVenta: idVenta,
            cantidad: producto.cantidad,
          }),
        },
      );

      const datosDetalle = await respuestaDetalle.json();

      if (!respuestaDetalle.ok) {
        throw new Error(
          datosDetalle.mensaje || "Error al registrar un producto",
        );
      }
    }

    localStorage.setItem("idVenta", idVenta);

    localStorage.removeItem("carrito");

    window.location.href = "../venta(ticket)/ticket.html";
  } catch (error) {
    console.error("No se pudo cargar el ticket:", error.message);
  }
}
