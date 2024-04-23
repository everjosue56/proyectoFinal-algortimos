 
let indiceimg
const palabrasAdivinar = [
    'casa',
    'carro',
    'perro',
    'aguacate',
    'computadora',
    'cuerpo',
    'cocina',
    'futbol',
    'maquina',
    'guitarra',
]

const imagenMunieco = [
    'ahorcado0.png',
    'ahorcado1.png',
    'ahorcado2.png',
    'ahorcado3.png',
    'ahorcado4.png',
    'ahorcado5.png',
    'ahorcado6.png',

]

let contadorError = 0;
let numeroOportunidades = 6;
let partidasPerdidas = 0;
let partidasGanadas = 0;
let partidasJugadas = 0;
inicializarPartidas();
 
 
//remplaza las letras de palabra escondida por guiones  
const palabraSecreta = palabrasAdivinar[Math.floor(Math.random()*palabrasAdivinar.length)];
let palabraEscondida = palabraSecreta.replace(/./g,"_ ");
document.querySelector('.palabraEscondida').innerHTML = palabraEscondida;


const reemplazar = (String, character, index) => {
    return String.substring(0, index) + character +
    String.substring(index + character.length)
//String: La cadena en la que se realizará el reemplazo.
// character: El carácter o la cadena que se utilizará para reemplazar en la posición especificada.
// index: El índice en la cadena donde se realizará el reemplazo.
//substring :se utiliza para extraer una parte de una cadena y devuelve la parte extraída como una nueva cadena
} 
  
 //evalua el caracter dedao por el usuario
const evaluarPalabra = () => {
    const letra = document.querySelector('input').value;
    document.querySelector('input').value = '';
     
    
    let acierto = true;
    for (let i = 0; i < palabraEscondida.length; i++) {
        if (palabraSecreta[i] === letra) {
            palabraEscondida = reemplazar(palabraEscondida, letra, i * 2);  // Remplaza un _ por la letra acertada
            acierto = false;
            const sonidoAdivino = new Audio('palabraadivinada.mp3');
            sonidoAdivino.play();
        }
    }
    // Actualiza palabra escondida
    document.querySelector('.palabraEscondida').innerHTML = palabraEscondida; 

    // si el caracte no esta en ninguna pocision de palabra escondida sera error 
  if(acierto){
    contadorError++
    // iniciarContadorTiempo();
    contadorIntentos();
    cambiarImagen();
    
    const sonidoError = new Audio('sonidoerror.mp3');
    sonidoError.play();
    // se encarga de comprobar que el usuario halla utulizado los 6 intentos y si se cumple hara lo que le sigue
    if(contadorError === 6){    
         document.querySelector('.card').innerHTML = `<h1 class="ganaste"> No haz adivinado la palabra :( La palabra era: ${palabraSecreta}</h1>`;
         const elemtentoganar = document.querySelector('.card');
         const cargarPagina = document.createElement('button');
         cargarPagina.textContent = "Jugar de nuevo";
         cargarPagina.id = 'cargarpagina';
         cargarPagina.addEventListener('click', function () {
             location.reload();
         });
         elemtentoganar.appendChild(cargarPagina);
         const sonidoPerdiste = new Audio('sonidoPerdiste.mp3');
        sonidoPerdiste.play();
        // detenerContadorTiempo();
       
        incrementarPartidasPerdidas();
       
        
    } 
  }

  //se encarga de dar las oportinidades restantes que le queda al jugador 
  function contadorIntentos(){
    const oportunidades = numeroOportunidades - contadorError;
    document.querySelector('.oportunidades').textContent = `Oportunidades restantes: ${oportunidades}`;
    indiceimg = contadorError;
  }
       
 //si el usuario llena todos los guiones se cumplira este if 
    if (!palabraEscondida.includes("_")) {
        document.querySelector('.card').innerHTML = '<h1 class="ganaste">Felicidades has adivinado la palabra :D !</h1>';
        const elemtentoganar = document.querySelector('.card');
        const cargarPagina = document.createElement('button');
        cargarPagina.textContent = "Jugar de nuevo";
        cargarPagina.id = 'cargarpagina';
        cargarPagina.addEventListener('click', function () {
            location.reload();
        });
        elemtentoganar.appendChild(cargarPagina);
        const sonidoGanaste = new Audio('sonidoganaste.mp3');
        sonidoGanaste.play();
        // detenerContadorTiempo()
        incrementarPartidasGanadas();
    } 
}


//funcion que cambia de imagenes junto al contadorerror 
function cambiarImagen(contadorError) {
const imgElemento = document.getElementById('ahorcadoImg');
const nuevaImagenSrc = 'img/' + imagenMunieco[indiceimg];
    imgElemento.src = nuevaImagenSrc;      
     
}

//funcion encargada de revelar una pista para el usuario 
let pistaUtilizada = false;

const botonPista = document.getElementById('botonPista');
botonPista.addEventListener('click', () => {
    if (!pistaUtilizada) {
        darPista(palabraSecreta);
        pistaUtilizada = true;  
    }
});


function darPista(palabraSecreta) {
    const letrasNoReveladas = [];
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraEscondida[i] === '_') {
            letrasNoReveladas.push(i);
        }
    }

    if (letrasNoReveladas.length === 0) {
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * letrasNoReveladas.length);
    const indice = letrasNoReveladas[indiceAleatorio];

    // Encuentra la posicion correcta para la letra en la palabra escondida
   // Encuentra la posicion correcta para la letra en la palabra escondida
let posicionCaracter = 0;
for (let j = 0; j < palabraEscondida.length; j++) {
    if (palabraEscondida[j] === '_') {
        if (posicionCaracter === indice) {
            palabraEscondida = palabraEscondida.substring(0, j) + palabraSecreta[indice] + palabraEscondida.substring(j + 1);
            break;  
        }
        posicionCaracter++
//se incrementa la pocision del caracter, porque al momento de convertir las letras a guiones se deja despues del guion se deja un espacio
    }
}

    // Actualiza la palabra escondida en el HTML
    document.querySelector('.palabraEscondida').textContent = palabraEscondida;
    botonPista.disabled = true;
}
 


//funcion contador de tiempo
// let tiempoInicio;
// let tiempoTranscurrido = 0;
// let tiempoInterval;

// function iniciarContadorTiempo() {
//     if (!tiempoInicio) {
//         tiempoInicio = Date.now(); 
//         tiempoInterval = setInterval(actualizarTiempo, 1000);  
//     }
// }

// function detenerContadorTiempo() {
//     clearInterval(tiempoInterval);  
// }

// function mostrarTiempo(tiempo) {
//     const minutos = Math.floor(tiempo / 60000);
//     const segundos = Math.floor((tiempo % 60000) / 1000);
//     const tiempoFormateado = `${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
//     document.querySelector('.tiempo').textContent = tiempoFormateado;
// }

// function actualizarTiempo() {
//     const tiempoActual = Date.now();  
//     tiempoTranscurrido = tiempoActual - tiempoInicio; 
//     mostrarTiempo(tiempoTranscurrido); 
// }

//evento click del boton verificar letra
document.querySelector('button').addEventListener ('click', evaluarPalabra);

console.log(palabraSecreta);

// Funcion para inicializar los datos de las partidas 
function inicializarPartidas() {
    const partidasGuardadas = localStorage.getItem('partidas');
    if (!partidasGuardadas) {
        localStorage.setItem('partidas', JSON.stringify({ ganadas: 0, perdidas: 0, jugadas: 0 }));
    }
}

// Funcion para guardar los datos de las partidas en localStorage
function guardarDatosPartidas(ganadas, perdidas, jugadas) {
    const datosPartidas = { ganadas: ganadas, perdidas: perdidas, jugadas: jugadas };
    localStorage.setItem('partidas', JSON.stringify(datosPartidas));
}

// Funcion para obtener los datos de las partidas desde localStorage
function obtenerDatosPartidas() {
    return JSON.parse(localStorage.getItem('partidas'));
}

// Incrementar el contador de partidas ganadas y partidas perdidass 
function incrementarPartidasGanadas() {
    const datosPartidas = obtenerDatosPartidas();
    datosPartidas.ganadas++;
    datosPartidas.jugadas++;
    guardarDatosPartidas(datosPartidas.ganadas, datosPartidas.perdidas, datosPartidas.jugadas);
    console.log('Partidas ganadas:', datosPartidas.ganadas);
    console.log('partidas jugadas:', datosPartidas.jugadas);
}

// Incrementar el contador de partidas perdidas y partidas jugadas
function incrementarPartidasPerdidas() {
    const datosPartidas = obtenerDatosPartidas();
    datosPartidas.perdidas++;
    datosPartidas.jugadas++;
    guardarDatosPartidas(datosPartidas.ganadas, datosPartidas.perdidas, datosPartidas.jugadas);
    console.log('Partidas perdidas:', datosPartidas.perdidas);
    console.log('partidas jugadas:', datosPartidas.jugadas);
}
 
 
 
