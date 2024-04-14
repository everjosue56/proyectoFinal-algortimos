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
    'ahorcado 0.png',
    'ahorcado 1.png',
    'ahorcado 2.png',
    'ahorcado 3.png',
    'ahorcado 4.png',
    'ahorcado 5.png',
    'ahorcado 6.png',

]

 
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

alert(palabraSecreta)
const evaluateWord = () => {
    const letra = document.querySelector('input').value
    let error = true
     
    for(let i = 0; i <palabraEscondida.length;i++){
           if(palabraSecreta[i] === letra){
             palabraEscondida = reemplazar(palabraEscondida, letra, i*2)  //remplaza un _ por la letra acertada
              error  = false
           }
    }
    document.querySelector('.palabraEscondida').innerHTML = palabraEscondida //actualiza palabra escondida


    if(!palabraEscondida.includes("_")){
        alert('has ganado');
    }


}
document.querySelector('button').addEventListener ('click', evaluateWord) //comparar letra por letra de la palabra ingresada con la palabra oculta