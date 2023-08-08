var secuencia = [];
const nombre = document.getElementById("nombre");
const formulario = document.querySelector("form");
const botonesSimon = document.querySelectorAll(".boton-color");
botonesSimon.forEach((botones) => {
    botones.addEventListener("click", clickeo);
    botones.addEventListener("mousedown", mouseDown);
    botones.addEventListener("mouseup", mouseUp);
});
var modoJugador = false;
var timerTurno = null;
var pasoJugador = 0;

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
    if (!formulario.checkValidity()) { //valida si el form es correcto
        event.preventDefault(); //interrumpe el comportamiento del evento que se está ejecutando
    } else {
        formulario.reset();//reset del input
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

function empezarJuego(){
    secuencia = [];
    turnoMaquina();    
}

function turnoMaquina(){ 
    limpiarSeleccionJugador();
    setTimeout(function () {
        empezarSeleccionarColor(0);
    }, 1000);
}

function limpiarSeleccionJugador() {
    var botones = document.getElementsByClassName("boton-color");

    for (let index = 0; index < botones.length; index++) {
        botones[index].classList.remove("modo-jugador");
    }
}

function empezarSeleccionarColor(pasoSecuencia){
    setTimeout(function () {
        limpiarSecuenciaActual();
        if (pasoSecuencia === secuencia.length) {
            agregarPasoASecuencia();

            hoverPasoSecuencia(pasoSecuencia);

            playerStep = 0;

            setTimeout(() => {
                limpiarSecuenciaActual();
                turnoJugador();
            }, 1000);
        }
        else {
            hoverPasoSecuencia(pasoSecuencia);

            empezarSeleccionarColor(pasoSecuencia + 1);
        }
    }, 1000);
}

function limpiarSecuenciaActual() {
    var botones = document.getElementsByClassName("boton-color");

    for (let index = 0; index < botones.length; index++) {
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
    document.getElementById("boton-color-" + secuencia[pasoSecuencia]).classList.add("activo");

    setTimeout(() => {
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
        
        //mostrar modal
        return;
    }

    if (pasoJugador === secuencia.length - 1) {
        modoJugador = false;

        //player score update
        //playerScore = playerScore + 10;
        //score.innerText = playerScore.toString();

        turnoMaquina();
        return;
    }

    pasoJugador = pasoJugador + 1;
    turnoJugador();
}

function turnoJugador() {
    // pongo estilos del modo jugador
    var botones = document.getElementsByClassName("boton-color");

    for (let index = 0; index < botones.length; index++) {
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