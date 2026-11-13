window.addEventListener("load", () => {
  const inputNombre = document.getElementById("nombre");
  const boton = document.getElementById("botonEntrar");
  const botonAdmin = document.getElementById("btnAdmin");
  const form = document.getElementById("formNombre");

  boton.disabled = true;

  inputNombre.addEventListener("input", () => {
    form.classList.add("was-validated");

    if (inputNombre.value.trim() === "" || !inputNombre.checkValidity()) {
      boton.disabled = true;
    } else {
      boton.disabled = false;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.classList.add("was-validated");

    if (form.checkValidity()) {
      const nombre = inputNombre.value.trim();

      localStorage.setItem("nombreCliente", nombre);

      window.location.href = "../inicio/inicio.html";
    }
  });

  botonAdmin.addEventListener("click", () => {});
});
