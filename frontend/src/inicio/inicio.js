async function cargarDestacados(tematica, idContenedor) {
    const getTematicas = await fetch(`http://localhost:3000/productos?tematica=${tematica}`);
    const productos = await getTematicas.json();

    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = "";

    productos.forEach(element => {
        contenedor.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${element.imagen}" class="card-img-top" alt="${element.nombre}">
                <div class="card-body" >
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">${element.descripcion}</p>
                </div>
            </div>
        `
    });
    
}

window.addEventListener("load", () => {
    const modalElement = document.getElementById("modalNombre");
    const modalNombre = new bootstrap.Modal(modalElement);
    const inputNombre = document.getElementById("nombreCliente");
    const botonAceptar = document.getElementById("botonEntrar");

    botonAceptar.disabled = true;

    modalNombre.show();

    inputNombre.addEventListener("input", () => {
        botonAceptar.disabled = inputNombre.value.trim() === "";
    });

    botonAceptar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        
        localStorage.setItem("nombreCliente", nombre)

        modalNombre.hide();
    });

    cargarDestacados("halloween", "halloween");
    cargarDestacados("navidad", "navidad");
});