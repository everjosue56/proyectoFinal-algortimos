 
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

let contadorError = 0
let numeroOportunidades = 6;


const palabraSecreta = palabrasAdivinar[Math.floor(Math.random()*palabrasAdivinar.length)]
let palabraEscondida = palabraSecreta.replace(/./g,"_ ")
document.querySelector('.palabraEscondida').innerHTML = palabraEscondida


const reemplazar = (String, character, index) => {
    return String.substring(0, index) + character +
    String.substring(index + character.length)
//String: La cadena en la que se realizará el reemplazo.
// character: El carácter o la cadena que se utilizará para reemplazar en la posición especificada.
// index: El índice en la cadena donde se realizará el reemplazo.
//substring :se utiliza para extraer una parte de una cadena y devuelve la parte extraída como una nueva cadena
}
 
//alert(palabraSecreta)
const evaluarPalabra = () => {
    const letra = document.querySelector('input').value;
    document.querySelector('input').value = '';
    
    let acierto = true;
    for (let i = 0; i < palabraEscondida.length; i++) {
        if (palabraSecreta[i] === letra) {
            palabraEscondida = reemplazar(palabraEscondida, letra, i * 2);  // Remplaza un _ por la letra acertada
            acierto = false;
            const sonidoAdivino = new Audio('palabraadivinada.mp3')
            sonidoAdivino.play();
        }
    }


// function darPista() {
    
//     let indice;
//     do {
//         indice = Math.floor(Math.random() * palabraEscondida.length);
//     } while (palabraEscondida[indice] !== '_');

//     palabraEscondida = palabraEscondida.substring(0, indice) + palabraSecreta[indice] + palabraEscondida.substring(indice + 1);
//     document.querySelector('.palabraEscondida').textContent = palabraEscondida;
//     if (!palabraEscondida.includes('_')) {
//         botonPista.disabled = true;
//     }
// }
    
    document.querySelector('.palabraEscondida').innerHTML = palabraEscondida; // Actualiza palabra escondida

  if(acierto){
    contadorError++
    contadorIntentos();
    cambiarImagen();
    const sonidoError = new Audio('sonidoerror.mp3')
    sonidoError.play();
    if(contadorError === 6){
      
       
         document.querySelector('.card').innerHTML = `<h1 class="ganaste"> No haz adivinado la palabra :( La palabra era: ${palabraSecreta}</h1>`
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
       
        
    } 
  }

  
  function contadorIntentos(){
    const oportunidades = numeroOportunidades - contadorError
    document.querySelector('.oportunidades').textContent = `Oportunidades restantes: ${oportunidades}`
    indiceimg = contadorError
  }
       

    if (!palabraEscondida.includes("_")) {
        document.querySelector('.card').innerHTML = '<h1 class="ganaste">Felicidades has adivinado la palabra :D !</h1>'
        const elemtentoganar = document.querySelector('.card');
        const cargarPagina = document.createElement('button');
        cargarPagina.textContent = "Jugar de nuevo";
        cargarPagina.id = 'cargarpagina';
        cargarPagina.addEventListener('click', function () {
            location.reload();
        });
        elemtentoganar.appendChild(cargarPagina);
        const sonidoGanaste = new Audio('sonidoganaste.mp3')
        sonidoGanaste.play();
    } 
}
function cambiarImagen(contadorError) {
const imgElemento = document.getElementById('ahorcadoImg');
const nuevaImagenSrc = 'img/' + imagenMunieco[indiceimg]
    imgElemento.src = nuevaImagenSrc;      
     
}

document.querySelector('button').addEventListener ('click', evaluarPalabra) //comparar letra por letra de la palabra ingresada con la palabra oculta