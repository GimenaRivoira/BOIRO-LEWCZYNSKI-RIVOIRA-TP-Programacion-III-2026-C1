// OBTENEMOS EL ICONO
let modeToggler = document.getElementById("mode-toggler");
// OBTENEMOS EL TAG HTML (TIENE LA PROPIEDAD DARK/LIGHT)
let html = document.getElementsByTagName("html")[0];

// CUANDO LA PAGINA CARGA VERIFICAMOS LA PREFERENCIA DEL USUARIO (LOCAL STORAGE)
window.onload = () => {
  const theme = localStorage.getItem("theme") || "light"; // Si es null, por defecto será light

  if (theme === "dark") {
    modeToggler.classList.remove("bi-brightness-high");
    modeToggler.classList.add("bi-moon");
    html.setAttribute("data-bs-theme", "dark");
  } else {
    modeToggler.classList.add("bi-brightness-high");
    modeToggler.classList.remove("bi-moon");
    html.setAttribute("data-bs-theme", "light");
  }
};

// LE ASIGNAMOS UNA FUNCION AL EVENTO CLICK DEL ICONO
modeToggler.addEventListener("click", () => {
  if (html.getAttribute("data-bs-theme") === "light") {
    // CAMBIAR A MODO DARK
    modeToggler.classList.remove("bi-brightness-high");
    modeToggler.classList.add("bi-moon");
    html.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    // CAMBIAR A MODO LIGHT
    modeToggler.classList.add("bi-brightness-high");
    modeToggler.classList.remove("bi-moon");
    html.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  }
});
