window.addEventListener("load", () => {
    const inputNombre = document.getElementById("nombre");
    const boton = document.getElementById("botonEntrar");

    boton.disabled = true;

    inputNombre.addEventListener("input", () => {
        if (inputNombre.value.trim() === "") {
            boton.disabled = true;
        } else {
            boton.disabled = false;
        }
        
    })

    boton.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if(nombre !== ""){
            localStorage.setItem("nombreCliente", nombre);
            window.location.href = "../inicio/inicio.html"
        };
    });
});