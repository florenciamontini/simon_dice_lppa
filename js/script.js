var secuencia = [];
const nombre = document.getElementById("nombre");
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formulario.checkValidity()) { //valida si el form es correcto
        event.preventDefault();
    } else {
        formulario.reset();
    }
});

nombre.addEventListener("input", function (event) {
    console.log(nombre.value);
    if (nombre.value.length >= 3) {
        nombre.setCustomValidity("");
    } else {
        nombre.setCustomValidity("El nombre debe tener al menos tres letras");
    }
});