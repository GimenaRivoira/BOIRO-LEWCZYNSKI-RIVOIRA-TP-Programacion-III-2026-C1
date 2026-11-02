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
});