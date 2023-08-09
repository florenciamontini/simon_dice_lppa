"use strict";

// Formulario de contacto
var nombreContacto = document.getElementById("nombreContacto");
var email = document.getElementById("email");
var mensaje = document.getElementById("mensaje");

// validacion formulario de contacto
email.addEventListener("input", function (event) {
	console.log(email.value);
	if (validarEmail(email)) {
		email.setCustomValidity("");
	} else {
		email.setCustomValidity("Email inválido");
	}
});

function validarEmail(inputText) {
	var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

	if (inputText.value.match(mailformat)) {
		return true;
	} else {
		return false;
	}
}

mensaje.addEventListener("input", function (event) {
	console.log(mensaje.value);
	if (mensaje.value.length > 5) {
		mensaje.setCustomValidity("");
	} else {
		mensaje.setCustomValidity("Debe tener al menos seis letras");
	}
});

nombreContacto.addEventListener("input", function (event) {
	console.log(nombreContacto.value);
	if (
		nombreContacto.value.length >= 3 &&
		esAlfanumerico(nombreContacto.value)
	) {
		nombreContacto.setCustomValidity("");
	} else {
		nombreContacto.setCustomValidity(
			"El nombre debe contener al menos tres letras y ser alfanumérico"
		);
	}
});

function esAlfanumerico(inputValue) {
	var regex = /^[a-zA-Z0-9]+$/;
	return regex.test(inputValue);
}
