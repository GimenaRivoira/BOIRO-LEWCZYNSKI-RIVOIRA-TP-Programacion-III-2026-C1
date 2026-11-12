document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
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

    function aumentarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    const producto = carrito.find((p) => p.id === id);

        if (producto.cantidad < producto.stock) {
            producto.cantidad++;
        } else {
            alert("No hay más stock disponible.");
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