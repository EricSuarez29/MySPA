var d = document,
    $mainConent = d.getElementById(`main-content`),
    $form = d.querySelector(`.formulario`),
    $links = d.querySelectorAll(`.nav-link`);

d.addEventListener("submit", function(e){
    e.preventDefault();
    var form = e.target;
    if(form.matches(`.formulario`)){
        e.preventDefault();
        if(form.action.value === `CREATE`){
            // Create
            create(form);
            showModal(false);
        }
        if(form.action.value === `UPDATE`){
            // Update
            update(form);
            showModal(false);
        }
    }
})


d.addEventListener(`click`, function(e){
    var $btnEvent = e.target;
    if($btnEvent.matches(`.nav-link`)){
        e.preventDefault();
        for(var i = 0; i < $links.length; i++){
            $links[i].classList.remove(`active`);
        }
        $btnEvent.classList.add(`active`);
        setContentHTML(`#main-content`, $btnEvent.href);
    }
    if($btnEvent.matches(`.update`)){
        $btnEvent.blur();
        setUpdateElements($btnEvent);
        showModal(true);
    }
    if($btnEvent.matches(`.btn-new`)){
        $btnEvent.blur();
        showModal(true);
    }
    
    if(e.target.matches(`.delete`)){
        
        $btnEvent.blur();
        Swal.fire({
            title: `Eliminar`,
            text: `¿Esta seguro de eliminar este producto con id ${$btnEvent.dataset.id}?`,
            icon: `warning`,
            padding: '2rem',
            backdrop: true,
            position: 'center',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            cancelButtonColor: 'rgb(212, 93, 93)',
            confirmButtonColor: 'rgb(72, 138, 182)'
        }).then(function(result){
            if(result.isConfirmed){
                deleteById(e.target.dataset.id);
            }
        });
    }
    if(e.target.matches(`.cancelar`)){
        $btnEvent.blur();
        showModal(false);
        clearForm();
    }
});

d.addEventListener(`keyup`, function(e){
    var $btnEvent = e.target;
    if($btnEvent.matches(`.search-elements`)){
        searchFilters(`.fila`, $btnEvent.value);
    }
    if(e.key === `Escape` && d.querySelector(`.main-modal`).matches(`.active`)){
        showModal(false);
        clearForm();
    }
});

d.addEventListener(`DOMContentLoaded`, function(e){
    setContentHTML($mainConent, `pages/producto/producto.html`);
});


/**
 * Esta funcion carga el modulo especificado por parametro en el contenedor.
 * @param {Object} contenedor El contenedor donde estara el codigo html del modulo
 * @param {String} url La ruta del modulo html
 */

function setContentHTML(contenedor, url){
    fetch(url,{
        method: `GET`,
        headers: {
            "Content-Type": `text/html`
        }
    })
    .then(res => res.ok? res.text() : Promise.reject())
    .then(html => $(contenedor).html(html))
    .catch(err => contenedor.innerHTML = `<h3>Ocurrio un error: ${err.statusText}</h3>`);
}

/**
 * Esta función activa o desactiva el modal del modulo.
 * @param {boolean} isActive Si se quiere mostrar el modal del modulo.
 */

function showModal(isActive){
    var modal = d.querySelector(`.main-modal`);
    if(isActive) modal.classList.add(`active`);
    else modal.classList.remove(`active`);
}