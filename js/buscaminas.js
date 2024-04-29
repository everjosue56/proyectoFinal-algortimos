document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const banderasRestantes = document.querySelector('#baderas-restantes')
    const resultado = document.querySelector('#resultado')
    const verPuntuacion = document.querySelector('.valor-puntuacion')
    const contadorBanderas = document.querySelector('#contador-banderas')

    let nDificultad = document.getElementById('dificultad');
    let barraOpciones = document.querySelector('.barra-opciones')


    let btnPlay = document.querySelector('#play')

    let ancho; 
    let cantidadBombas = 0;
    let claseDificulatad = 0 ;
    let cuadradosPeq = [];
    let finPartida = false;
    let puntuacion = 0;
    let banderas = 0;
    let id;
    let user = [];
    let usuariosData = []
    let bonus =  0;
    let bonusGane = 0;
    

    usuariosData = JSON.parse(localStorage.getItem('usuarios'))
    id = localStorage.getItem('idActual')
    // console.log(usuariosData);
    // console.log(id);
    let userName = usuariosData.find(usuario => usuario.userId == (id))
    
    // console.log(userName);
    

    btnPlay.addEventListener('click',function(){
        banderas = 0;
        finPartida   = false;
        resultado.innerHTML= '';
        puntuacion = 0;
        contadorBanderas.hidden = false;
        verPuntuacion.innerHTML = puntuacion;
        reset()
        start();
        console.log(usuariosData);
        crearTablero()
        
    })
    // crear el tablero



function añadirNumeros(ancho) {
        
     for (let i = 0; i < cuadradosPeq.length; i++) {
         let total = 0;
    
         const esBordeIzq = (i % ancho === 0)
         const esBordeDer = (i % ancho === ancho - 1)
            
    
         if(cuadradosPeq[i].classList.contains('valida')){
            // Vemos si hay bomba en la casilla anterior (a la izquierda de la que se dio click)
                if (i > 0 && !esBordeIzq && cuadradosPeq[i-1].classList.contains('bomb')){
                    total++;
                    
                }
             // Vemos si hay bomba en la casilla siguiente (a la derecha de la que se hizo click)   
                if ((i < (ancho*ancho) - 1) && !esBordeDer && cuadradosPeq[i+1].classList.contains('bomb')){
                    total++;
                }
            //  Vemos si hay bomba en la casilla superior (la que esta arriba de la que se seleccionó )
                if ((i > ancho) && cuadradosPeq[i - ancho].classList.contains('bomb')) {
                    total++;
                }
            // Vemos si hay bomba en la casilla siguiente de la fila anterior (a la derecha esquina superior)
                if(i > (ancho - 1) && !esBordeDer && cuadradosPeq[i + 1 - ancho].classList.contains('bomb')){
                    total++;
                }
            // Vemos si hay bomba en la casilla anterior de la fila anterior (a la iquierda esquina superior)
    
                if ((i > ancho ) && !esBordeIzq &&cuadradosPeq[i - ancho - 1].classList.contains('bomb')){
                    total ++;
                }
            //  Vemos si hay bomba en la casilla siguiente de la fila siguiente (a la iquierda esquina superior)
                if((i < (ancho*(ancho-1))) && !esBordeIzq && cuadradosPeq[i-1+ancho].classList.contains('bomb')){
                    console.log('funciona');
                    total++;
                }
            // Vemos si hay bomba en la casilla inferior (justo debajo)
                if ((i < (ancho*(ancho-1)))  && !esBordeDer && cuadradosPeq[i + 1 + ancho].classList.contains('bomb')) {
                    total++;
                }
            // Vemos si hay bomba en la casilla siguiente de la fila siguiente (a la derecha esquina inferior)
                if ((i < (ancho*(ancho-1))) &&cuadradosPeq[i + ancho].classList.contains('bomb')) {
                    total++;
                }
                cuadradosPeq[i].setAttribute('data',total)

                
    
                
                }
            
            }
        } 

    function chequearVacios(cuadrado){

        const idActual = parseInt(cuadrado.id)
        // console.log(idActual);
        const esBordeIzq = (idActual % ancho === 0)
        const esBordeDer = (idActual % ancho === ancho - 1)
        
        
        setTimeout( function(){
            if(idActual > 0 && !esBordeIzq){
                const nuevoId =[parseInt(idActual) - 1]
                
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
                
            }
            if(idActual < (ancho*ancho-2) && !esBordeDer){
                const nuevoId = [parseInt(idActual)  + 1]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }
            if(idActual >= ancho){
                const nuevoId = [parseInt(idActual)  - ancho]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }
            if(idActual > (ancho-1) && !esBordeDer){
                const nuevoId = [parseInt(idActual) + 1 - ancho]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }
            
            if(idActual > (ancho+1) && !esBordeIzq){
                const nuevoId = [parseInt(idActual)  - 1 - ancho]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }
            if(idActual < (ancho*(ancho-1)) && !esBordeDer){
                const nuevoId = [parseInt(idActual)   + ancho]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }
            
            if(idActual < ((ancho*ancho)-ancho-2) && !esBordeDer){
                const nuevoId = [parseInt(idActual)  + 1 + ancho]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }
            if(idActual < (ancho*ancho-ancho) && !esBordeIzq){
                const nuevoId = [parseInt(idActual)  - 1 + ancho]
                const nuevoCuadrado = document.getElementById(nuevoId)
                click(nuevoCuadrado)
            }

            
            
            
        }, 10);
        
    }

    function FindelJuego() {
        stop();
        let sonidoExplosion = new Audio('/sonidosBuscaminas/Explosion.mp3');
        sonidoExplosion.play();
        resultado.innerHTML= '¡BOOM! Fin del Juego';
        finPartida = true;
        userName.pPerdidasBuscaminas++;
        
        // console.log(usuariosData);
        localStorage.setItem('usuarios', JSON.stringify(usuariosData));
        
        cuadradosPeq.forEach(function(cuadrado) {
            if (cuadrado.classList.contains('bomb')){
                cuadrado.innerHTML = '💣'
                cuadrado.classList.remove('bomb')
                cuadrado.classList.add('checked')

            }
        });
        

    }

    function anadirBandera(cuadrado,cantidadBombas,bonusGane){
        
        if (finPartida) return

        if (!cuadrado.classList.contains('checked') && (banderas <= cantidadBombas)){
            if (!cuadrado.classList.contains('bandera')){
                banderas ++;
                cuadrado.classList.add('bandera')
                cuadrado.innerHTML = '🚩'
                banderasRestantes.innerHTML = cantidadBombas - banderas;
                verificarGane(bonusGane);
            }else{
                cuadrado.classList.remove('bandera')
                banderas--;
                cuadrado.innerHTML = '';
                banderasRestantes.innerHTML = cantidadBombas- banderas;
            }
        }
    }
    

    function verificarGane(bonusGane) {
        let igualdad = 0;
        for (let i =0; i < cuadradosPeq.length ; i++){
            if (cuadradosPeq[i].classList.contains('bandera')&& cuadradosPeq[i].classList.contains('bomb')){
                igualdad++;
            }
            if(igualdad === cantidadBombas){
                stop();
                finPartida = true;
                puntuacion += bonusGane; 
                console.log(`Esta es el bonus de gane ${puntuacion}`);
                verPuntuacion.innerHTML = puntuacion;
                VerificartopScore(puntuacion);
                userName.pGanadasBuscaminas++;
                localStorage.setItem('usuarios', JSON.stringify(usuariosData));
                
                felicitacion();
                
                resultado.innerHTML = 'GANÓ'
                
                return;
            }
        }
    }
function felicitacion(){

    
    confetti();
    confetti();
    let sonidoGane = new Audio('/sonidosBuscaminas/Gano.mp3');
    sonidoGane.play();
   
}


  
function VerificartopScore(puntuacion){
    if (puntuacion > userName.topScore){
        userName.topScore = puntuacion;
        console.log(usuariosData);
        localStorage.setItem('usuarios', JSON.stringify(usuariosData));
    }
}

    
    function click(cuadrado) {
        
        // console.log(`este es el bonus ${bonus}`);
        let multiplicador = bonus;
    


        if (finPartida || cuadrado.classList.contains('checked') || cuadrado.classList.contains('bandera'))return;

        if (cuadrado.classList.contains('bomb')){

            FindelJuego()
                
        }else{
            
            puntuacion = puntuacion + multiplicador;
            let total = cuadrado.getAttribute('data')
            if(total != 0){
                cuadrado.classList.add('checked')
                if (total == 1 ) cuadrado.classList.add('uno')
                if (total == 2) cuadrado.classList.add('dos')
                if (total == 3 ) cuadrado.classList.add('tres')
                if (total == 4 ) cuadrado.classList.add('cuatro')
                if (total == 5 ) cuadrado.classList.add('cinco')
                if (total == 6 ) cuadrado.classList.add('seis')
                cuadrado.innerHTML = total;
                verPuntuacion.innerHTML = puntuacion;
                VerificartopScore(puntuacion);
                
                return 
            }
            
            cuadrado.classList.add('checked')  
            
            
        }
        chequearVacios(cuadrado)  
        
        
    }

    


function crearTablero() {
    
    // console.log(nDificultad.value);
    switch(nDificultad.value){
        
        case "DIFICIL":
            ancho = 7;
            claseDificulatad = "dificil";
            cantidadBombas = 2;
            bonus = 5;
            bonusGane = 150;
            finPartida = false;

            break;
        case "MEDIO":
            ancho = 9;
            claseDificulatad = "medio";
            cantidadBombas = 20;
            bonus = 3;
            bonusGane = 100;
            finPartida = false;
            break;
         case "FACIL":
            ancho = 10; 
            claseDificulatad = "facil";
            cantidadBombas = 15;
            bonus = 1;
            bonusGane = 50;
            finPartida = false;
            break;      
    }
    grid.classList.remove("facil","medio","dificil");
    barraOpciones.classList.remove("facil","medio","dificil");

    grid.classList.add(claseDificulatad)
    barraOpciones.classList.add(claseDificulatad)
    // console.log(grid);
    

    grid.innerHTML = '';
    banderasRestantes.innerHTML = cantidadBombas;
    cuadradosPeq = [];
    const arrayBombas = Array(cantidadBombas).fill('bomb')
    const arrayVacio = Array((ancho*ancho)-cantidadBombas).fill('valida')
    const arrayJuego = arrayVacio.concat(arrayBombas);
    const arregloMesclado = arrayJuego.sort(()=> (Math.random () - 0.5))
    console.log(arregloMesclado);
    
    
    console.log(ancho*ancho);

    for (let i = 0; i < ancho * ancho; i++) {
        const cuadrado = document.createElement ('div');
        cuadrado.setAttribute("id",i)
        cuadrado.classList.add(arregloMesclado[i])
        grid.appendChild(cuadrado)
        cuadradosPeq.push(cuadrado)
       
        cuadrado.addEventListener('click', function (){
            
            click(cuadrado,bonus)

        });

        cuadrado.addEventListener('contextmenu', function (){
            event.preventDefault();
            console.log('click derecho');
            anadirBandera(cuadrado,cantidadBombas,bonusGane);

        });
         // Inicia el juego boton de play IMPORTANTE-----
        
    } 
    añadirNumeros(ancho);
    
}

let hr = 0, min = 0, sec = 0, ms = 0;
let startTimer;
function start() {
    btnPlay.classList.add('active');
    startTimer = setInterval(() => {
        ms++;
        if (ms == 100) {
            sec++;
            ms = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hr++;
            min = 0;
        }
        putValue();
    }, 10);
}

function stop() {
    btnPlay.classList.remove("active");
    clearInterval(startTimer);
}

function reset() {
    btnPlay.classList.remove("active");
    clearInterval(startTimer);
    hr = min = sec = ms = 0;
    putValue();
}

function putValue() {
    document.querySelector('.ms').innerHTML = ms < 10 ? "0" + ms : ms;
    document.querySelector('.second').innerHTML = sec < 10 ? "0" + sec : sec;
    document.querySelector('.minute').innerHTML = min < 10 ? "0" + min : min;
    document.querySelector('.hour').innerHTML = hr < 10 ? "0" + hr : hr;
}
    // crearTablero();
           
  


    
console.log(grid);
   





    


});
