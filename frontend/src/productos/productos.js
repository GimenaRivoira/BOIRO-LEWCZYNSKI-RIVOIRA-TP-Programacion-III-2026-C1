window.addEventListener("load", () => {
  const nombre = localStorage.getItem("nombreCliente");

  const params = new URLSearchParams(window.location.search);

  let tipo = params.get("tipo");

  cargarProductos(tipo);
});


async function cargarProductos(tipo) {
  let url = "http://localhost:3000/productos";

  if (tipo === "velas") {
    url = url + "?tipo=velas";
  } else if (tipo === "flores") {
    url = url + "?tipo=flores";
  }

  const respuesta = await fetch(url);
  const productos = await respuesta.json();
  const contenedor = document.getElementById("listaProductos");

  contenedor.innerHTML = "";

  productos.forEach((p) => {
    contenedor.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">

        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.descripcion}</p>
          <p class="card-text">Precio: $${p.precio}</p>
          <p class="card-text">Stock: ${p.stock}</p>
          <button class="btn btn-success w-100" onclick="agregarAlCarrito(${p.id})" style="background-color: #2D4F44; letter-spacing: 1px; font-size: 0.9rem; font-weight: 600;">Agregar al carrito</button>
        </div>

      </div>`;
  });

  actualizarBotones(tipo);
}

function actualizarBotones(tipo) {
  const botonVelas = document.getElementById("botonVelas");

  const botonFlores = document.getElementById("botonFlores");

  botonVelas.disabled = false;

  botonFlores.disabled = false;

  if (tipo === "velas") {
    botonVelas.disabled = true;
  } else if (tipo === "flores") {
    botonFlores.disabled = true;
  }
}

function agregarAlCarrito(id) {
  // ACA VA FUNCIONALIDAD CARRITO
  console.log("Producto agregado al carrito:", id);
}