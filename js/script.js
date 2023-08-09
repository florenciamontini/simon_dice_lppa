"use strict";
var secuencia = [];
var nombre = document.getElementById("nombre");
var formulario = document.querySelector("form");
var botonesSimon = document.querySelectorAll(".boton-color");
botonesSimon.forEach(function (botones) {
	botones.addEventListener("click", clickeo);
	botones.addEventListener("mousedown", mouseDown);
	botones.addEventListener("mouseup", mouseUp);
});
var modoJugador = false;
var timerTurno = null;
var pasoJugador = 0;
var puntajeJugador = 0;
var puntaje = document.getElementById("puntaje");
var cerrarModal = document.getElementById("cerrarModal");
var seguirJugando = document.getElementById("seguirJugando");
var modal = document.getElementById("miModal");

function clickeo(event) {
	validarPasoJugador(event);
}

function mouseDown(event) {
	botonPresionado(event);
}

function mouseUp(event) {
	limpiarSecuenciaActual(event);
}

formulario.addEventListener("submit", function (event) {
	event.preventDefault();
	if (!formulario.checkValidity()) {
		event.preventDefault();
	} else {
		formulario.reset();
		empezarJuego();
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

function empezarJuego() {
	secuencia = [];
	puntaje.innerText = puntajeJugador;
	turnoMaquina();
}

function turnoMaquina() {
	limpiarSeleccionJugador();
	setTimeout(function () {
		empezarSeleccionarColor(0);
	}, 1000);
}

function limpiarSeleccionJugador() {
	var botones = document.getElementsByClassName("boton-color");
	for (var index = 0; index < botones.length; index++) {
		botones[index].classList.remove("modo-jugador");
	}
}

function empezarSeleccionarColor(pasoSecuencia) {
	setTimeout(function () {
		limpiarSecuenciaActual();
		if (pasoSecuencia === secuencia.length) {
			agregarPasoASecuencia();
			hoverPasoSecuencia(pasoSecuencia);
			pasoJugador = 0;
			setTimeout(function () {
				limpiarSecuenciaActual();
				turnoJugador();
			}, 1000);
		} else {
			hoverPasoSecuencia(pasoSecuencia);
			empezarSeleccionarColor(pasoSecuencia + 1);
		}
	}, 1000);
}

function limpiarSecuenciaActual() {
	var botones = document.getElementsByClassName("boton-color");
	for (var index = 0; index < botones.length; index++) {
		botones[index].classList.remove("activo");
	}
}

function agregarPasoASecuencia() {
	var max = 4;
	var min = 1;
	var nuevoPaso = Math.floor(Math.random() * (max - min + 1) + min);
	secuencia.push(nuevoPaso);
}

function hoverPasoSecuencia(pasoSecuencia) {
	document
		.getElementById("boton-color-" + secuencia[pasoSecuencia])
		.classList.add("activo");
	setTimeout(function () {
		limpiarSecuenciaActual();
	}, 500);
}

function validarPasoJugador(evento) {
	if (!modoJugador) {
		return;
	}
	clearTimeout(timerTurno);
	var botonPresionado = parseInt(evento.target.id.replace("boton-color-", ""));
	if (secuencia[pasoJugador] !== botonPresionado) {
		abrirModal();
		return;
	}
	if (pasoJugador === secuencia.length - 1) {
		modoJugador = false;
		puntajeJugador = puntajeJugador + 100;
		puntaje.innerText = puntajeJugador.toString();
		turnoMaquina();
		return;
	}
	pasoJugador = pasoJugador + 1;
	turnoJugador();
}

function turnoJugador() {
	var botones = document.getElementsByClassName("boton-color");
	for (var index = 0; index < botones.length; index++) {
		botones[index].classList.add("modo-jugador");
	}
	clearTimeout(timerTurno);
	modoJugador = true;
}

function botonPresionado(evento) {
	if (!modoJugador) {
		return;
	}
	evento.target.classList.add("activo");
}

cerrarModal.addEventListener("click", function () {
	modal.style.display = "none";
	secuencia = [];
	limpiarSeleccionJugador();
});

seguirJugando.addEventListener("click", function () {
	modal.style.display = "none";
	secuencia = [];
	turnoMaquina();
});

function abrirModal() {
	limpiarSecuenciaActual();
	puntajeJugador = 0;
	puntaje.innerText = puntajeJugador.toString();
	clearTimeout(timerTurno);
	modal.style.display = "block";
}
