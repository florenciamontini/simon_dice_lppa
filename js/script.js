"use strict"; // Errores mas visibles
var secuencia = [];
var nombre = document.getElementById("nombre");
var formulario = document.querySelector("form"); // querySelector devuelve el primer elemento del documento
var botonesSimon = document.querySelectorAll(".boton-color");
botonesSimon.forEach(function (botones) {
	botones.addEventListener("click", clickeo);
	botones.addEventListener("mousedown", mouseDown);
	botones.addEventListener("mouseup", mouseUp);
});
var modoJugador = false;
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

// Validacion nombre inicial antes de comenzar **
nombre.addEventListener("input", function (event) {
	console.log(nombre.value);
	if (nombre.value.length >= 3) {
		nombre.setCustomValidity("");
	} else {
		nombre.setCustomValidity("El nombre debe tener al menos tres letras");
	}
});

// Submit - Valido que el formulario de nombre no este vacío y cumpla con al menos tres letras
formulario.addEventListener("submit", function (event) {
	event.preventDefault(); // Evita que la pag se recargue
	if (!formulario.checkValidity()) {
		event.preventDefault();
	} else {
		// Reseteo formulario y arranca el juego
		formulario.reset();
		puntajeJugador = 0;
		puntaje.innerText = puntajeJugador.toString();
		empezarJuego();
	}
});

function empezarJuego() {
	// Inicializo secuencia vacía y activo el puntaje jugador
	secuencia = [];
	puntaje.innerText = puntajeJugador;
	turnoMaquina();
}

// Arranca el turno máquina
function turnoMaquina() {
	// Limpio la seleccion del jugador, limpio estilo de cada boton
	limpiarSeleccionJugador();
	setTimeout(function () {
		empezarSeleccionarColor(0);
	}, 1000);
}

function limpiarSeleccionJugador() {
	var botones = document.getElementsByClassName("boton-color"); //Obtiene todos los elementos de la clase boton-color
	for (var index = 0; index < botones.length; index++) {
		// Itera en los elementos
		botones[index].classList.remove("modo-jugador"); // Elimina la clase modo-jugador de cada elemento (quita el hover)
	}
}

function empezarSeleccionarColor(pasoSecuencia) {
	// Paso secuencia es el indice
	setTimeout(function () {
		limpiarSecuenciaActual();
		if (pasoSecuencia === secuencia.length) {
			// Evaluo si el paso de la secuencia es el ultimo iluminado
			agregarPasoASecuencia(); // Como es el ultimo, agrego un color mas a la secuencia
			hoverPasoSecuencia(pasoSecuencia); // Ilumina los colores de la secuencia
			pasoJugador = 0; // Reseteo el paso del jugador para que arranque desde cero
			setTimeout(function () {
				limpiarSecuenciaActual(); // Se asegura de eliminar el active de los botones (luz)
				turnoJugador(); // Activa modo jugador
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
// Metodo para elegir color al azar y pushearlo dentro de la secuencia
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
	// Valido cada paso del jugador para ver si la secuencia fue correcta
	if (!modoJugador) {
		return;
	}
	var botonPresionado = parseInt(evento.target.id.replace("boton-color-", "")); // Se obtiene qué color presionó el usuario
	if (secuencia[pasoJugador] !== botonPresionado) {
		// Valida si el boton presionado es igual al que la maquina eligió
		abrirModal();
		return;
	}
	if (pasoJugador === secuencia.length - 1) {
		// Valido si es el final de la secuencia
		modoJugador = false; // Es turno de la maquina
		puntajeJugador = puntajeJugador + 100;
		puntaje.innerText = puntajeJugador.toString();
		turnoMaquina();
		return;
	}
	pasoJugador = pasoJugador + 1; // Incremento del paso del jugador para validar siguiente paso
	turnoJugador();
}

function turnoJugador() {
	var botones = document.getElementsByClassName("boton-color");
	for (var index = 0; index < botones.length; index++) {
		botones[index].classList.add("modo-jugador");
	}
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
	puntaje.innerText = puntajeJugador.toString(); // Asigno en html el valor del puntaje = 0
	modal.style.display = "block";
}
