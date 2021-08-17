var d = document,
    $template = d.getElementById(`templ-cliente`).content,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);

var clientes = [
        {
            id: 1,
            name: `Juan`,
            address: `Av Pase del Lomo #432`,
            last_pa: `Martinez`,
            last_ma: `Perez`,
            gender: `H`,
            rfc: `EURQO234AIKER`,
            tel: `4773243119`,
            email: `juanperez@gmai.com`,
            user: `juanito123`,
            password: `juanelmalo123`,
            status: 1
        }
]


function setUpdateElements(btnUpdate){
    $form.querySelector(`.title-form`).textContent = `Editar Cliente`;
    $form.querySelector(`[type='submit']`).value = `Editar`;

    var btnUpdate = btnUpdate.dataset;
    $form.querySelector(`#id`).value = btnUpdate.id;
    $form.querySelector(`#name`).value = btnUpdate.name;
    $form.querySelector(`#address`).value = btnUpdate.address;
    $form.querySelector(`#last_pa`).value = btnUpdate.last_pa;
    $form.querySelector(`#last_ma`).value = btnUpdate.last_ma;
    $form.querySelector(`#${btnUpdate.gender === `H`
        ? "man-gender"
        : btnUpdate.gender === `M` 
            ? "womam-gender"
            : "other-gender"}`)
    .checked = true;
    $form.querySelector(`#rfc`).value = btnUpdate.rfc;
    $form.querySelector(`#tel`).value = btnUpdate.tel;
    $form.querySelector(`#email`).value = btnUpdate.email;
    $form.querySelector(`#user`).value = btnUpdate.user;
    $form.querySelector(`#password`).value = btnUpdate.password;
    $form.querySelector(`#password_confirm`).value = btnUpdate.password;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchClientById(parseInt(btnUpdate.id));
    $form.querySelector(`#position`).value = i;
}

// CRUD ----------------------------------------------------------------

function create(form){
    var cliente = new Object();

    cliente.id = parseInt(form.id.value);
    cliente.name = form.name.value;
    cliente.address = form.address.value;
    cliente.last_pa = form.last_pa.value;
    cliente.last_ma = form.last_ma.value;
    cliente.gender = form.gender.value;
    cliente.rfc = form.rfc.value;
    cliente.tel = form.tel.value;
    cliente.email = form.email.value;
    cliente.user = form.user.value;
    cliente.password = form.password.value;
    cliente.status = 1;

    var i = searchClientById(cliente.id);
    if(i === -1){
        this.clientes.push(cliente);
        Swal.fire({
            title: `Cliente Creado`,
            text: `El Cliente fue creado correctamente`,
            icon: `success`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false
        });
    }else{
        Swal.fire({
            title: `Error`,
            text: `El id del cliente ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
    }

    clearForm();
    readAllElements();
}

function readAllElements(){
    var $fragmento = d.createDocumentFragment();
    for(var i = 0; i < this.clientes.length; i++){
        setRowTable(this.clientes[i], $fragmento);
    }
    $tbody.innerHTML = '';
    $tbody.appendChild($fragmento);
}

// Recibe por parametro el formulario donde se genero el evento

function update(form){
    var i = parseInt(form.position.value);
    var j = searchClientById(parseInt(form.id.value));

    if(j !== -1 && j !== i) {
        
        Swal.fire({
            title: `Error`,
            text: `El id del cliente ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });

        return;
    }

    this.clientes[i].id = parseInt(form.id.value);
    this.clientes[i].name = form.name.value;
    this.clientes[i].address = form.address.value;
    this.clientes[i].last_pa = form.last_pa.value;
    this.clientes[i].last_ma = form.last_ma.value;
    this.clientes[i].gender = parseInt(form.gender.value) === 1
        ? `H`
        : form.gender.value;
    this.clientes[i].rfc = form.rfc.value;
    this.clientes[i].tel = form.tel.value;
    this.clientes[i].email = form.email.value;
    this.clientes[i].user = form.user.value;
    this.clientes[i].password = form.password.value;

    clearForm();
    readAllElements();


    Swal.fire({
        title: `Cliente Actualizado`,
        text: `El cliente se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

}

function deleteById(id){
    this.clientes = this.clientes.filter(function(el){
        return el.id !== parseInt(id);
    });
    
    Swal.fire({
        title: `Cliente Eliminado`,
        text: `El cliente fue eliminado correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

    readAllElements();
}

function searchClientById(id){
    for(var i = 0; i < this.clientes.length; i++){
        if(this.clientes[i].id === id){
            return i;
        }
    }
    return -1;
}

function setRowTable(el, fragmento){
    $template.querySelector(`.id`).textContent = el.id;
    $template.querySelector(`.name`).textContent = el.name;
    $template.querySelector(`.address`).textContent = el.address;
    $template.querySelector(`.last_pa`).textContent = el.last_pa;
    $template.querySelector(`.last_ma`).textContent = el.last_ma;
    $template.querySelector(`.gender`).textContent = el.gender;
    $template.querySelector(`.rfc`).textContent = el.rfc;
    $template.querySelector(`.tel`).textContent = el.tel;
    $template.querySelector(`.email`).textContent = el.email;
    $template.querySelector(`.user`).textContent = el.user;
    $template.querySelector(`.password`).textContent = el.password;
    $template.querySelector(`.status`).textContent = el.status;
    
    $template.querySelector(`.update`).dataset.id = el.id; 
    $template.querySelector(`.update`).dataset.name = el.name; 
    $template.querySelector(`.update`).dataset.address = el.address; 
    $template.querySelector(`.update`).dataset.last_pa = el.last_pa;
    $template.querySelector(`.update`).dataset.last_ma = el.last_ma;
    $template.querySelector(`.update`).dataset.gender = el.gender;
    $template.querySelector(`.update`).dataset.rfc = el.rfc;
    $template.querySelector(`.update`).dataset.tel = el.tel;
    $template.querySelector(`.update`).dataset.email = el.email;
    $template.querySelector(`.update`).dataset.user = el.user;
    $template.querySelector(`.update`).dataset.password = el.password;
    $template.querySelector(`.update`).dataset.status = el.status;
    
    $template.querySelector(`.delete`).dataset.id = el.id;
    
    var $clone = d.importNode($template, true);
    fragmento.appendChild($clone);
}

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Cliente`;
    $form.querySelector(`[type='submit']`).value = `Crear`;
    
    $form.querySelector(`#id`).value = "";
    $form.querySelector(`#name`).value = "";
    $form.querySelector(`#address`).value = "";
    $form.querySelector(`#last_pa`).value = "";
    $form.querySelector(`#last_ma`).value = "";
    $form.querySelector(`#man-gender`).checked = false;
    $form.querySelector(`#woman-gender`).checked = false;
    $form.querySelector(`#other-gender`).checked = false;
    $form.querySelector(`#rfc`).value = "";
    $form.querySelector(`#tel`).value = "";
    $form.querySelector(`#email`).value = "";
    $form.querySelector(`#user`).value = "";
    $form.querySelector(`#password`).value = "";
    $form.querySelector(`#password_confirm`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();