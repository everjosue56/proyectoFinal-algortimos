document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const banderasRestantes = document.querySelector('#baderas-restantes')
    const resultado = document.querySelector('#resultado')
    const verPuntuacion = document.querySelector('.valor-puntuacion')

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



    btnPlay.addEventListener('click',function(){
        
        perdio = false;
    
       'click',crearTablero()
        
    })
    // crear el tablero



function añadirNumeros(ancho) {
        
     for (let i = 0; i < cuadradosPeq.length; i++) {
         let total = 0;
    
         const esBordeIzq = (i % ancho === 0)
         const esBordeDer = (i % ancho === ancho - 1)
            
    
         if(cuadradosPeq[i].classList.contains('valida')){
                if (i > 0 && !esBordeIzq && cuadradosPeq[i-1].classList.contains('bomb')){
                    total++;
                    
                }
                
                if ((i < (ancho*ancho) - 1) && !esBordeDer && cuadradosPeq[i+1].classList.contains('bomb')){
                    total++;
                }
    
                if ((i > ancho) && cuadradosPeq[i - ancho].classList.contains('bomb')) {
                    total++;
                }
    
                if(i > (ancho - 1) && !esBordeDer && cuadradosPeq[i + 1 - ancho].classList.contains('bomb')){
                    total++;
                }
    
    
                if ((i > ancho ) && !esBordeIzq &&cuadradosPeq[i - ancho - 1].classList.contains('bomb')){
                    total ++;
                }
                
                if((i < (ancho*(ancho-1))) && !esBordeIzq && cuadradosPeq[i-1+ancho].classList.contains('bomb')){
                    console.log('funciona');
                    total++;
                }
                if ((i < (ancho*(ancho-1)))  && !esBordeDer && cuadradosPeq[i + 1 + ancho].classList.contains('bomb')) {
                    total++;
                }
                if ((i < (ancho*(ancho-1))) &&cuadradosPeq[i + ancho].classList.contains('bomb')) {
                    total++;
                }
                cuadradosPeq[i].setAttribute('data',total)
    
                //  if (i > 0 && !esBordeIzq && cuadradosPeq[i-1].classList.contains('bomb')) total1++;
                //  console.log(total1);
                //     // Vemos si hay bomba en la casilla siguiente
                //  if (i < (ancho*ancho-1) && !esBordeDer && cuadradosPeq[i+1].classList.contains('bomb')) total1++;
                //  console.log(total1);
                //     // Vemos si hay bomba en la casilla superior
                //  if (i > ancho && cuadradosPeq[i-ancho].classList.contains('bomb')) total1++;
                //  console.log(total1);
                //  // Vemos si hay bomba en la casilla siguiente de la fila anterior
                //  if (i > (ancho-1) && !esBordeDer && cuadradosPeq[i+1-ancho].classList.contains('bomb')) total1++;
                //  console.log(total1);
                //  // Vemos si hay bomba en la casilla anterior de la fila anterior
                // if (i > ancho && !esBordeIzq && cuadradosPeq[i-1-ancho].classList.contains('bomb')) total1++;
                //  console.log(total1);
                //  // Vemos si hay bomba en la casilla inferior
                //  if (i < (ancho*(ancho-1)) && cuadradosPeq[i+ancho].classList.contains('bomb')) total1++;
                //     console.log(total1);
                //     // Vemos si hay bomba en la casilla siguiente de la fila siguiente
                //     if (i < (ancho*(ancho-1)) && !esBordeDer && cuadradosPeq[i+1+ancho].classList.contains('bomb')) total1++;
                //     console.log(total1);
                //     // Vemos si hay bomba en la casilla anterior de la fila siguiente
                //     if (i < (ancho*(ancho-1)) && !esBordeIzq && cuadradosPeq[i-1+ancho].classList.contains('bomb')){
                //         total1++;
                //     } 
                    
                //     // Guardamos el nº de bombas en atributo data
                //     cuadradosPeq[i].setAttribute('data', total1);
                
    
    
                
                }
            
            }
        } 

    function chequearVacios(cuadrado){
        const idActual = parseInt(cuadrado.id)
        console.log(idActual);
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
        resultado.innerHTML= '¡BOOM! Fin del Juego';
        finPartida = true;

        cuadradosPeq.forEach(function(cuadrado) {
            if (cuadrado.classList.contains('bomb')){
                cuadrado.innerHTML = '💣'
                cuadrado.classList.remove('bomb')
                cuadrado.classList.add('checked')

            }
        });
        

    }

    function anadirBandera(cuadrado){
        if (finPartida) return
        if (!cuadrado.classList.contains('checked') && (banderas <= cantidadBombas)){
            if (!cuadrado.classList.contains('bandera')){
                banderas ++;
                cuadrado.classList.add('bandera')
                cuadrado.innerHTML = '🚩'
                banderasRestantes.innerHTML = cantidadBombas- banderas
                verificarGane();
            }else{
                cuadrado.classList.remove('bandera')
                banderas--;
                cuadrado.innerHTML = '';
                banderasRestantes.innerHTML = cantidadBombas- banderas
            }
        }
    }
    

    function verificarGane() {
        let igualdad = 0;
        for (let i =0; i < cuadradosPeq.length ; i++){
            if (cuadradosPeq[i].classList.contains('bandera')&& cuadradosPeq[i].classList.contains('bomb')){
                igualdad++;
            }
            if(igualdad === cantidadBombas){
                finPartida = true;
                // var count = 200;
                // var defaults = {
                //   origin: { y: 0.7 }
                // };
                
                // function fire(particleRatio, opts) {
                //   confetti({
                //     ...defaults,
                //     ...opts,
                //     particleCount: Math.floor(count * particleRatio)
                //   });
                // }
                
                // fire(0.25, {
                //   spread: 26,
                //   startVelocity: 75,
                // });
                // fire(0.2, {
                //   spread: 60,
                // });
                // fire(0.35, {
                //   spread: 100,
                //   decay: 0.91,
                //   scalar: 0.8
                // });
                // fire(0.1, {
                //   spread: 120,
                //   startVelocity: 25,
                //   decay: 0.92,
                //   scalar: 1.2
                // });
                // fire(0.1, {
                //   spread: 120,
                //   startVelocity: 15,
                // });
                felicitacion();
                resultado.innerHTML = 'GANÓ'
                
                
            }
        }
    }
function felicitacion(){

   confetti();
}
  
    
    function click(cuadrado) {
        console.log('click');
        
    //    felicitacion();


        if (finPartida || cuadrado.classList.contains('checked') || cuadrado.classList.contains('bandera'))return;

        if (cuadrado.classList.contains('bomb')){
            FindelJuego()
                
        }else{
            puntuacion ++;
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
                return 
            }
            
            cuadrado.classList.add('checked')  
            
            
        }
        chequearVacios(cuadrado)  
        
        
    }




function crearTablero() {
    
    console.log(nDificultad.value);
    switch(nDificultad.value){
        
        case "DIFICIL":
            ancho = 7;
            claseDificulatad = "dificil";
            cantidadBombas = 22;
            finPartida = false;
            break;
        case "MEDIO":
            ancho = 9;
            claseDificulatad = "medio";
            cantidadBombas = 20;
            finPartida = false;
            break;
         case "FACIL":
            ancho = 10; 
            claseDificulatad = "facil";
            cantidadBombas = 15;
            finPartida = false;
            break;      
    }
    grid.classList.remove("facil","medio","dificil");
    barraOpciones.classList.remove("facil","medio","dificil");

    grid.classList.add(claseDificulatad)
    barraOpciones.classList.add(claseDificulatad)
    console.log(grid);
    

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
                
            click(cuadrado)

        });

        cuadrado.addEventListener('contextmenu', function (){
            event.preventDefault();
            console.log('click derecho');
            anadirBandera(cuadrado);

        });
         // Inicia el juego boton de play IMPORTANTE-----
        
    } 
    añadirNumeros(ancho);
    
}
    
   
    crearTablero();
           
  


    
console.log(grid);
   





    


});
