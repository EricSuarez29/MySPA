var d = document,
    $template = d.getElementById(`templ-producto`).content,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);
    // productosFiltrados;

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

/**
 * Esta función establece los datos en el modal para posteriormente sean actualizados.
 * @param {Object} btnUpdate El boton que contiene los data attributes
 */

function setUpdateElements(btnUpdate){
    $form.querySelector(`.title-form`).textContent = `Editar Producto`;
    $form.querySelector(`[type='submit']`).value = `Editar`;

    var btnUpdateData = btnUpdate.dataset;
    $form.querySelector(`#id`).value = btnUpdateData.id;
    $form.querySelector(`#name`).value = btnUpdateData.name;
    $form.querySelector(`#brand`).value = btnUpdateData.brand;
    $form.querySelector(`#price`).value = btnUpdateData.price;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchProductById(parseInt(btnUpdateData.id));
    $form.querySelector(`#position`).value = i;
}

// CRUD ----------------------------------------------------------------

/**
 * Esta función recibe el formulario donde se genero el evento de tipo 'submit',
 * la cual permite obtener los valores del mismo, y simular una conexión a 
 * una base de datos.
 * @param {Object} form El formulario del modulo donde se genero el evento submit.
 */

function create(form){
    var producto = new Object(); // caja vacia

    producto.id = parseInt(form.id.value); // atributo id
    producto.name = form.name.value;
    producto.brand = form.brand.value;
    producto.price = parseFloat(form.price.value);
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

    clearForm(); // limpia el formulario
    readAllElements();
}

/**
 * Esta función se encarga de leer todos los objetos que hay en la base de
 * datos, recorrerlos, almacenarlos dentro de un fragmento para posteriormente
 * inyectarlos en el DOM.
 */

function readAllElements(){
    var $fragmento = d.createDocumentFragment();
    for(var i = 0; i < this.productos.length; i++){
        setRowTable(this.productos[i], $fragmento);
    }
    $tbody.innerHTML = '';
    $tbody.appendChild($fragmento);
}

/**
 * Esta función actualiza los datos del objeto, recie el formulario,
 * mediante el evento 'submit'.
 * @param {object} form Recibe el formulario del modulo.
 * @returns {void}
 */

function update(form){
    var i = parseInt(form.position.value);
    var j = searchProductById(parseInt(form.id.value));

    if(j !== -1 && j !== i) {
        
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

        return;
    }

    this.productos[i].id = parseInt(form.id.value);
    this.productos[i].name = form.name.value;
    this.productos[i].brand = form.brand.value;
    this.productos[i].price = parseFloat(form.price.value);

    clearForm();
    readAllElements();


    Swal.fire({
        title: `Producto Actualizado`,
        text: `El producto se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        backdrop: true,
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

}

/**
 * Esta función permite eliminar el objeto indicado su id por parametro
 * @param {number} id El id del producto que se desea eliminar
 */

function deleteById(id){
    this.productos = this.productos.filter(function(el){
        return el.id !== parseInt(id);
    });
    
    Swal.fire({
        title: `Producto Eliminado`,
        text: `El producto fue eliminado correctamente`,
        icon: `success`,
        padding: '2rem',
        backdrop: true,
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

    readAllElements();
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
 * Esta función filtra los objetos dependiendo de el criterio que le pasemos,
 * por parametro.
 * @param {String} selector El selector con el cual evalua el filtrado
 * @param {String} value El o los caracteres que se desean encontrar.
 * @returns {void}
 */

function searchFilters(selector, value){
    var option = d.getElementById(`options`),
        optionSelect = option.options[option.selectedIndex].value;
    if(!optionSelect) return;

    var elements = d.querySelectorAll(selector);

    for(var i = 0; i < elements.length; i++){
        elements[i].querySelector(`.${optionSelect}`).textContent
        .toLowerCase().includes(value)
        ? elements[i].classList.remove(`d-none`)
        : elements[i].classList.add(`d-none`)
    }
}

/**
 * Esta función establece los elementos dentro de un fragmento.
 * @param {Object} el El elemento o objeto que se quiere insertar
 * @param {Object} fragmento El fragamento donde se quiere guardar el objeto
 */

function setRowTable(el, fragmento){
    $template.querySelector(`.id`).textContent = el.id;
    $template.querySelector(`.name`).textContent = el.name;
    $template.querySelector(`.brand`).textContent = el.brand;
    $template.querySelector(`.price`).textContent = el.price;
    $template.querySelector(`.status`).textContent = el.status;
    
    $template.querySelector(`.update`).dataset.id = el.id; 
    $template.querySelector(`.update`).dataset.name = el.name; 
    $template.querySelector(`.update`).dataset.brand = el.brand; 
    $template.querySelector(`.update`).dataset.price = el.price;
    $template.querySelector(`.update`).dataset.status = el.status;
    
    $template.querySelector(`.delete`).dataset.id = el.id;
    
    var $clone = d.importNode($template, true);
    $tbody.innerHTML = $clone;
    fragmento.appendChild($clone);
}

/**
 * Esta función limpia todos los campos del formulario, y le
 * da al mismo un estado inicial.
 */

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Producto`;
    $form.querySelector(`[type='submit']`).value = `Crear`;
    
    $form.querySelector(`#id`).value = "";
    $form.querySelector(`#name`).value = "";
    $form.querySelector(`#brand`).value = "";
    $form.querySelector(`#price`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();