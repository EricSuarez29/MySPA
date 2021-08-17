var d = document,
    $mainConent = d.getElementById(`main-content`),
    $form = d.querySelector(`.formulario`),
    $links = d.querySelectorAll(`.nav-link`);

d.addEventListener(`click`, function(e){
    var $btnEvent = e.target;
    if($btnEvent.matches(`.nav-link`) || $btnEvent.parentElement.matches(`.nav-link`)){
        $btnEvent = $btnEvent.parentElement.matches(`.nav-link`)
            ? $btnEvent.parentElement
            : $btnEvent;
        e.preventDefault();
        for(var i = 0; i < $links.length; i++){
            $links[i].classList.remove(`active`);
        }
        $btnEvent.classList.add(`active`);
        setContentHTML(`#main-content`, $btnEvent.href);
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
    .catch(err => contenedor.innerHTML = `<h3>Ocurrio un error: ${err.status}</h3>`);
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