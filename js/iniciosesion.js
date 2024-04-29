
const userAdded = document.querySelector('.nombre-usuario')
const btnAddUser = document.querySelector('.nuevo-usuario')
const listaUsuarios = document.querySelector('.usuario-existente')

let usuariosData = []
let usuarios 

btnAddUser.addEventListener('click', function (){
    
    if(userAdded.value === ''){
        alert('¡Error! - El campo no puede estar Vacío')
    }else{
        if(JSON.parse(localStorage.getItem('usuarios'))!== 'undefined' && JSON.parse(localStorage.getItem('usuarios'))){
            usuarios = JSON.parse(localStorage.getItem('usuarios'))
            usuariosData = JSON.parse(localStorage.getItem('usuarios'))
    
            // console.log(usuarios);
            // console.log(usuarios.id);
            let id = (usuarios.length) + 1;
            console.log(id);
            for (let i = 0; i < usuariosData.length; i++) {
                let userName = usuariosData.find(usuario => usuario.userId === (i + 1))
                let usuarioIngresado = userAdded.value.trim();
                if (userName.usuario.toLowerCase() === usuarioIngresado.toLowerCase()){
                    alert('El nombre de usuario ya existe')
                    return;
                }
            }
            agregarUsuarios(userAdded,id)
            // console.log(usuariosData);
            localStorage.setItem('usuarios', JSON.stringify(usuariosData));
            
            alert('Usuario Agregado con Éxito')
           
                
            
    
        }else{
            let id = 1;
            agregarUsuarios(userAdded,id)
            localStorage.setItem('usuarios', JSON.stringify(usuariosData));
            alert('Usuario Agregado con Éxito')

        }
        window.location.href = "juegos.html";
    }

    

});


function agregarUsuarios(userAdded,id){
    localStorage.setItem('idActual',id)
    nuevoUsuario ={
        usuario : userAdded.value.trim(),
        userId : id,
        pGanadasAhorcado : 0,
        pPerdidasAhorcado : 0,
        pJugadas : 0,
        pGanadasBuscaminas : 0,
        pPerdidasBuscaminas : 0,
        topScore : 0,
    }
    usuariosData.push(nuevoUsuario);
}

function lisitarUsuariosExistentes(){
    
    if(JSON.parse(localStorage.getItem('usuarios'))!== 'undefined' && JSON.parse(localStorage.getItem('usuarios'))){
        usuariosData = JSON.parse(localStorage.getItem('usuarios'))
    }
    
    console.log(usuariosData);
    for (let i = 0; i < usuariosData.length; i++) {
        
        let userName = usuariosData.find(usuario => usuario.userId === (i + 1))
       
        const option = document.createElement('option')
        option.classList.add('option')
        option.innerHTML= userName.usuario;
        option.setAttribute('id', i +1)
        listaUsuarios.appendChild(option);
    }

   
}

lisitarUsuariosExistentes(usuariosData)

listaUsuarios.addEventListener('click', function(){
    
    if (listaUsuarios.value != 'default') {
        usuarios = JSON.parse(localStorage.getItem('usuarios'))
        
        for (let i = 0; i < usuarios.length; i++) {
            
           if(listaUsuarios.value == usuarios[i].usuario){
            let id = usuarios[i].userId;
            localStorage.setItem('idActual',id)
            window.location.href = "juegos.html";
           }
            
        }
    }
    
});