var d = document,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);

var productos = [
        {
            id: 1,
            name: `Aceite de Coco`,
            brand: `Nature`,
            price: 30,
            status: 1
        },
        {
            id: 2,
            name: `Toalla`,
            brand: `Nature`,
            price: 100,
            status: 1
        },
        {
            id: 3,
            name: `Crema`,
            brand: `Avon`,
            price: 300,
            status: 1
        },
        {
            id: 4,
            name: `Miel`,
            brand: `Nature`,
            price: 45,
            status: 1
        }
]


// CRUD ----------------------------------------------------------------

/**
 * Esta función gestiona las acciones al momendo de crear o actualizar un elemento.
 */


function accion(){
    var $accion = d.getElementById(`action`);
    if($accion.value === `CREATE`){
        create();
    }
    if($accion.value === `UPDATE`){
        update();
    }
}

/**
 * Esta función recibe el formulario donde se genero el evento de tipo 'submit',
 * la cual permite obtener los valores del mismo, y simular una conexión a 
 * una base de datos.
 * @param {Object} form El formulario del modulo donde se genero el evento submit.
 */

function create(){
    var producto = new Object(); // caja vacia
    
    producto.id = parseInt(d.getElementById(`id`).value); // atributo id
    producto.name = d.getElementById(`name`).value;
    producto.brand = d.getElementById(`brand`).value;
    producto.price = parseFloat(d.getElementById(`price`).value);
    producto.status = 1;
    
    var i = searchProductById(producto.id);
    if(i === -1){ // si el id del producto no esta creado ejecuta esto
        productos.push(producto);
        Swal.fire({
            title: `Producto Creado`,
            text: `El producto fue creado correctamente`,
            icon: `success`,
            padding: '2rem',
            backdrop: true,
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false
        });
    }else{
        Swal.fire({
            title: `Error`,
            text: `El id del producto ya existe`,
            icon: `error`,
            padding: '2rem',
            backdrop: true,
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
    }
    
    showModal(false) // limpia el formulario
    readAllElements();
}

/**
 * Esta función se encarga de leer todos los objetos que hay en la base de
 * datos, recorrerlos, almacenarlos dentro de un fragmento para posteriormente
 * inyectarlos en el DOM.
 */

function readAllElements(){
    var contenido = ``;
    
    for(var i = 0; i < this.productos.length; i++){
        contenido += getContentRow(this.productos[i]);
    }
    $tbody.innerHTML = contenido;
}

function getContentRow(el){
    return `
    <tr class="fila">
    <td class="id">${el.id}</td>
    <td class="name">${el.name}</td>
    <td class="brand">${el.brand}</td>
    <td class="price">${el.price}</td>
    <td class="status">${el.status}</td>
    <td>
    <button class="update btn" onclick="setUpdateElements(${el.id})">
    <i class="fas fa-edit"></i>
    </button>
    <button class="delete btn" onclick="deleteById(${el.id});">
    <i class="fas fa-trash-alt"></i>
    </button>
    </td>
    </tr>
    `;
}

function showModal(isActive){
    var modal = d.querySelector(`.main-modal`);
    if(isActive){
        modal.classList.add(`active`);
    } else{
        modal.classList.remove(`active`);
        clearForm();
    } 
}

function getProductById(id){
    for(var i = 0; i < productos.length; i++){
        if(productos[i].id === id){
            return productos[i];
        }
    }
    return null;
}

/**
 * Esta función actualiza los datos del objeto, recie el formulario,
 * mediante el evento 'submit'.
 * @param {object} form Recibe el formulario del modulo.
 * @returns {void}
 */

function update(){
    var i = parseInt(d.getElementById(`position`).value);
    var j = searchProductById(parseInt(d.getElementById(`id`).value));
    
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
    
    this.productos[i].id = parseInt(d.getElementById(`id`).value);
    this.productos[i].name = d.getElementById(`name`).value;
    this.productos[i].brand = d.getElementById(`brand`).value;
    this.productos[i].price = parseFloat(d.getElementById(`price`).value);
    
    showModal(false);
    readAllElements();
    
    
    Swal.fire({
        title: `Producto Actualizado`,
        text: `El producto se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });
    
}

/**
 * Esta función establece los datos en el modal para posteriormente sean actualizados.
 * @param {Object} btnUpdate El boton que contiene los data attributes
 */

function setUpdateElements(id){
    $form.querySelector(`.title-form`).textContent = `Editar Producto`;
    $form.querySelector(`.create`).textContent = `Editar`;

    var btnUpdate = getProductById(id);
    $form.querySelector(`#id`).value = btnUpdate.id;
    $form.querySelector(`#name`).value = btnUpdate.name;
    $form.querySelector(`#brand`).value = btnUpdate.brand;
    $form.querySelector(`#price`).value = btnUpdate.price;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchProductById(parseInt(btnUpdate.id));
    $form.querySelector(`#position`).value = i;

    showModal(true);
}

/**
 * Esta función permite eliminar el objeto indicado su id por parametro
 * @param {number} id El id del producto que se desea eliminar
 */

function deleteById(id){
    Swal.fire({
        title: `Eliminar`,
        text: `¿Esta seguro de eliminar este elemento con id ${id}?`,
        icon: `warning`,
        padding: '2rem',
        position: 'center',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        cancelButtonColor: 'rgb(212, 93, 93)',
        confirmButtonColor: 'rgb(72, 138, 182)'
    }).then(function(result){
        if(result.isConfirmed){
            this.productos = this.productos.filter(function(el){
                return el.id !== parseInt(id);
            });
            
            Swal.fire({
                title: `Producto Eliminado`,
                text: `El producto fue eliminado correctamente`,
                icon: `success`,
                padding: '2rem',
                toast: true,
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false
            });
        
            readAllElements();
        }
    });
}

/**
 * Esta función busca si el objeto buscado por id ya existe y si no es así,
 * devuelve -1 indicando que no existe.
 * @param {number} id El id del producto que se desea buscar.
 * @returns {number}
 */

function searchProductById(id){
    for(var i = 0; i < productos.length; i++){
        if(productos[i].id === id){
            return i;
        }
    }
    return -1;
}

/**
 * Esta función limpia todos los campos del formulario, y le
 * da al mismo un estado inicial.
 */

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Producto`;
    $form.querySelector(`.create`).textContent = `Crear`;
    
    $form.querySelector(`#id`).value = "";
    $form.querySelector(`#name`).value = "";
    $form.querySelector(`#brand`).value = "";
    $form.querySelector(`#price`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();