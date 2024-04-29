
console.log('funciona');

if(JSON.parse(localStorage.getItem('usuarios'))!== 'undefined' && JSON.parse(localStorage.getItem('usuarios'))){
    usuariosData = JSON.parse(localStorage.getItem('usuarios'))
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
console.log(usuarios);

    
    
    
   let modeloTabla = '<table>';
    modeloTabla = modeloTabla + '<tr> <th>Id</th> <th>Usuario</th> <th>P Jugadas</th> <th>L - Ahorcado</th> <th>W - Ahorcado</th> <th>Top Scores</th> <th>L - Buscaminas</th> <th>W - Buscaminas</th></tr>';
    
    usuarios.forEach(p => {
        modeloTabla = modeloTabla + '<tr> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.userId+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.usuario+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.pJugadas+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.pPerdidasAhorcado+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.pGanadasAhorcado+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.topScore+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.pPerdidasBuscaminas+'</td> ';
        modeloTabla = modeloTabla + '<td class= elemento>'+p.pGanadasBuscaminas+'</td> ';
        modeloTabla = modeloTabla +'</tr>'
    });
    modeloTabla = modeloTabla + '</table>'; 
    document.getElementById('contenedor').innerHTML =modeloTabla;
}else{
    document.getElementById('contenedor').innerHTML ='NO HAY DATOS PARA MOSTRAR';
}



// let tabla = document.querySelector('.datos')

// let userName = usuariosData.find(usuario => usuario.userId === (i + 1))

    
    
   
