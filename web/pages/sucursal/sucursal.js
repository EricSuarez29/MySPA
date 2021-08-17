var d = document,
    $template = d.getElementById(`templ-sucursal`).content,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);

var sucursales = [
        {
            id: 1,
            name: `Sucursal Zona Centro`,
            latitud: 1.432532532,
            longitud: 234.453463,
            address: `Calle Aldama #123`,
            status: 1
        },
        {
            id: 2,
            name: `Sucursal Lopez Mateos`,
            latitud: 134.44353454,
            longitud: 34.23532553,
            address: `Lona del mirador #112`,
            status: 1
        }
]


function setUpdateElements(btnUpdate){
    $form.querySelector(`.title-form`).textContent = `Editar Sucursal`;
    $form.querySelector(`[type='submit']`).value = `Editar`;

    var btnUpdate = btnUpdate.dataset;
    $form.querySelector(`#id`).value = btnUpdate.id;
    $form.querySelector(`#name`).value = btnUpdate.name;
    $form.querySelector(`#longitud`).value = btnUpdate.longitud;
    $form.querySelector(`#latitud`).value = btnUpdate.latitud;
    $form.querySelector(`#address`).value = btnUpdate.address;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchSucursalById(parseInt(btnUpdate.id));
    $form.querySelector(`#position`).value = i;
}

// CRUD ----------------------------------------------------------------

function create(form){
    var sucursal = new Object();

    sucursal.id = parseInt(form.id.value);
    sucursal.name = form.name.value;
    sucursal.longitud = parseFloat(form.longitud.value);
    sucursal.latitud = parseFloat(form.latitud.value);
    sucursal.address = form.address.value;

    var i = searchSucursalById(sucursal.id);
    if(i === -1){
        sucursales.push(sucursal);
        Swal.fire({
            title: `Sucursal Creada`,
            text: `La sucursal fue creado correctamente`,
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
            text: `El id de la sucursal ya existe`,
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
    for(var i = 0; i < this.sucursales.length; i++){
        setRowTable(this.sucursales[i], $fragmento);
    }
    $tbody.innerHTML = '';
    $tbody.appendChild($fragmento);
}

// Recibe por parametro el formulario donde se genero el evento

function update(form){
    var i = parseInt(form.position.value);
    var j = searchSucursalById(parseInt(form.id.value));

    if(j !== -1 && j !== i) {
        
        Swal.fire({
            title: `Error`,
            text: `El id del producto ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });

        return;
    }

    this.sucursales[i].id = parseInt(form.id.value);
    this.sucursales[i].name = form.name.value;
    this.sucursales[i].lontitud = parseFloat(form.longitud.value);
    this.sucursales[i].latitud = parseFloat(form.latitud.value);
    this.sucursales[i].address = form.address.value;

    clearForm();
    readAllElements();


    Swal.fire({
        title: `Sucursal Actualizada`,
        text: `La sucursal se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

}

function deleteById(id){
    this.sucursales = this.sucursales.filter(function(el){
        return el.id !== parseInt(id);
    });
    
    Swal.fire({
        title: `Sucursal Eliminada`,
        text: `La sucursal fue eliminado correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

    readAllElements();
}

function searchSucursalById(id){
    for(var i = 0; i < this.sucursales.length; i++){
        if(this.sucursales[i].id === id){
            return i;
        }
    }
    return -1;
}

function setRowTable(el, fragmento){
    $template.querySelector(`.id`).textContent = el.id;
    $template.querySelector(`.name`).textContent = el.name;
    $template.querySelector(`.longitud`).textContent = el.longitud;
    $template.querySelector(`.latitud`).textContent = el.latitud;
    $template.querySelector(`.address`).textContent = el.address;
    $template.querySelector(`.status`).textContent = el.status;
    
    $template.querySelector(`.update`).dataset.id = el.id; 
    $template.querySelector(`.update`).dataset.name = el.name; 
    $template.querySelector(`.update`).dataset.longitud = el.longitud; 
    $template.querySelector(`.update`).dataset.latitud = el.latitud;
    $template.querySelector(`.update`).dataset.address = el.address;
    $template.querySelector(`.update`).dataset.status = el.status;
    
    $template.querySelector(`.delete`).dataset.id = el.id;
    
    var $clone = d.importNode($template, true);
    fragmento.appendChild($clone);
}

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Producto`;
    $form.querySelector(`[type='submit']`).value = `Crear`;
    
    $form.querySelector(`#id`).value = "";
    $form.querySelector(`#name`).value = "";
    $form.querySelector(`#longitud`).value = "";
    $form.querySelector(`#latitud`).value = "";
    $form.querySelector(`#address`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();