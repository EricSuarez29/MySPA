var d = document,
    $template = d.getElementById(`templ-empleado`).content,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);

var empleados = [
        {
            id: 1,
            name: `Pedro`,
            address: `Av Pase de la ermita #321`,
            last_pa: `Juarez`,
            last_ma: `Salazar`,
            gender: `H`,
            rfc: `PDRO21383434`,
            tel: `4771235432`,
            jobposition: `Masajista`,
            photo: `pedro`,
            url: `assets/images/empleados/pedro.jpg`,
            user: `pedro123`,
            password: `pedro123`,
            status: 1
        }
]


function setUpdateElements(btnUpdate){
    $form.querySelector(`.title-form`).textContent = `Editar Empleado`;
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
    $form.querySelector(`#jobposition`).value = btnUpdate.jobposition;
    $form.querySelector(`#photo`).value = btnUpdate.jobposition;
    // $form.querySelector(`#url`).value = btnUpdate.url;
    $form.querySelector(`#user`).value = btnUpdate.user;
    $form.querySelector(`#password`).value = btnUpdate.password;
    $form.querySelector(`#password_confirm`).value = btnUpdate.password;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchEmpleadoById(parseInt(btnUpdate.id));
    $form.querySelector(`#position`).value = i;
}

// CRUD ----------------------------------------------------------------

function create(form){
    var empleado = new Object();

    empleado.id = parseInt(form.id.value);
    empleado.name = form.name.value;
    empleado.address = form.address.value;
    empleado.last_pa = form.last_pa.value;
    empleado.last_ma = form.last_ma.value;
    empleado.gender = form.gender.value;
    empleado.rfc = form.rfc.value;
    empleado.tel = form.tel.value;
    empleado.photo = form.photo.value;
    empleado.url = form.url.value;
    empleado.user = form.user.value;
    empleado.password = form.password.value;
    empleado.status = 1;

    var i = searchEmpleadoById(empleado.id);
    if(i === -1){
        this.empleados.push(empleado);
        Swal.fire({
            title: `Empleado Creado`,
            text: `El empleado fue creado correctamente`,
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
            text: `El id del empleado ya existe`,
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
    for(var i = 0; i < this.empleados.length; i++){
        setRowTable(this.empleados[i], $fragmento);
    }
    $tbody.innerHTML = '';
    $tbody.appendChild($fragmento);
}

// Recibe por parametro el formulario donde se genero el evento

function update(form){
    var i = parseInt(form.position.value);
    var j = searchEmpleadoById(parseInt(form.id.value));

    if(j !== -1 && j !== i) {
        
        Swal.fire({
            title: `Error`,
            text: `El id del empleado ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });

        return;
    }

    this.empleados[i].id = parseInt(form.id.value);
    this.empleados[i].name = form.name.value;
    this.empleados[i].address = form.address.value;
    this.empleados[i].last_pa = form.last_pa.value;
    this.empleados[i].last_ma = form.last_ma.value;
    this.empleados[i].gender = parseInt(form.gender.value) === 1
        ? `H`
        : form.gender.value;
    this.empleados[i].rfc = form.rfc.value;
    this.empleados[i].tel = form.tel.value;
    this.empleados[i].jobposition = form.jobposition.value;
    this.empleados[i].photo = form.photo.value;
    this.empleados[i].url = form.url.value;
    this.empleados[i].user = form.user.value;
    this.empleados[i].password = form.password.value;

    clearForm();
    readAllElements();


    Swal.fire({
        title: `Empleado Actualizado`,
        text: `El empleado se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

}

function deleteById(id){
    this.empleados = this.empleados.filter(function(el){
        return el.id !== parseInt(id);
    });
    
    Swal.fire({
        title: `Empleado Eliminado`,
        text: `El empleado fue eliminado correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

    readAllElements();
}

function searchEmpleadoById(id){
    for(var i = 0; i < this.empleados.length; i++){
        if(this.empleados[i].id === id){
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
    $template.querySelector(`.jobposition`).textContent = el.jobposition;
    $template.querySelector(`.photo`).textContent = el.photo;
    $template.querySelector(`.url`).src = el.url;
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
    $template.querySelector(`.update`).dataset.jobposition = el.jobposition;
    $template.querySelector(`.update`).dataset.photo = el.photo;
    $template.querySelector(`.update`).dataset.url = el.url;
    $template.querySelector(`.update`).dataset.user = el.user;
    $template.querySelector(`.update`).dataset.password = el.password;
    $template.querySelector(`.update`).dataset.status = el.status;
    
    $template.querySelector(`.delete`).dataset.id = el.id;
    
    var $clone = d.importNode($template, true);
    fragmento.appendChild($clone);
}

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Empleado`;
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
    $form.querySelector(`#jobposition`).value = "";
    $form.querySelector(`#photo`).value = "";
    $form.querySelector(`#url`).value = "";
    $form.querySelector(`#user`).value = "";
    $form.querySelector(`#password`).value = "";
    $form.querySelector(`#password_confirm`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();