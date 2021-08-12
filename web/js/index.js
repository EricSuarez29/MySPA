var d = document;

var users = [
    {
        name: "root",
        password: "root"
    }
]

// elemento que este a la escucha 
// elemento que desencadene la accion

// document se refiere a toda la pagina

document.addEventListener(`submit` ,function(e){
    e.preventDefault();
    if(validarUsuario()){
        window.location = `main.html`;
        clearFormLogin();
    }else{

    }
});

function validarUsuario(){
    var user = d.getElementById("username"),
        password = d.getElementById("password");

    for(var i = 0; i < users.length; i++){
        if(this.users[i].name === user.value){
            if(this.users[i].password === password.value){
                return true;
            }
        }
    }
    return false;
}

function clearFormLogin(){
    var user = d.getElementById("username"),
        password = d.getElementById("password");

    user.value = "";
    password.value = "";
}