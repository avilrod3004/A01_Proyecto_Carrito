let contenidoCarrito = [];

const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#lista-carrito').querySelector('tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

document.addEventListener('DOMContentLoaded', () => {
    obtenerAlmacenamiento()
    mostrarCarrito()
})

listaCursos.addEventListener('click', (event) => {
    if (event.target.classList.contains('agregar-carrito')) {
        const datosCurso = buscarDatosCurso(event.target);
        agregarAlCarrito(datosCurso);
        limpiarCarrito()
        mostrarCarrito()
        almacenar()
    }
})

carrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('borrar-curso')) {
        const idCusorEliminar = event.target.parentElement.parentElement.getAttribute('data-id');
        contenidoCarrito = contenidoCarrito.filter(curso => curso.id !== idCusorEliminar);
        limpiarCarrito()
        mostrarCarrito()
        almacenar()
    }
})

vaciarCarrito.addEventListener('click', () => {
    limpiarCarrito()
    contenidoCarrito = [];
    almacenar()
})

function buscarDatosCurso(elemento) {
    const divCard = elemento.parentElement.parentElement;

    return {
        imagen: divCard.querySelector('img').src,
        nombre: divCard.querySelector('.info-card').querySelector('h4').textContent,
        precio: divCard.querySelector('.info-card').querySelector('.u-pull-right').textContent,
        cantidad: 1,
        id: divCard.querySelector('.agregar-carrito').getAttribute('data-id'),
    }
}

function agregarAlCarrito(datosCurso) {
    const repetido = contenidoCarrito.some(curso => curso.id === datosCurso.id);

    if (repetido) {
        const curso = contenidoCarrito.find(curso => curso.id === datosCurso.id);
        curso.cantidad++;
    } else {
        contenidoCarrito.push(datosCurso)
    }
}

function mostrarCarrito() {
    contenidoCarrito.forEach(curso => {
        const fila = document.createElement('tr');
        fila.setAttribute('data-id', curso.id);

        const imagen = document.createElement('img');
        imagen.src = curso.imagen;
        imagen.classList.add('imagen-curso', 'u-full-width');

        const columnaImagen = document.createElement('td');
        columnaImagen.appendChild(imagen);
        fila.appendChild(columnaImagen);

        const columnaNombre = document.createElement('td');
        columnaNombre.textContent = curso.nombre;
        fila.appendChild(columnaNombre);

        const columanPrecio = document.createElement('td');
        columanPrecio.textContent = curso.precio;
        fila.appendChild(columanPrecio);

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = curso.cantidad;
        fila.appendChild(columnaCantidad);

        const borrarCurso = document.createElement('a');
        borrarCurso.textContent = "X"
        borrarCurso.classList.add('borrar-curso');

        const columnaBorrarCurso = document.createElement('td');
        columnaBorrarCurso.appendChild(borrarCurso)
        fila.appendChild(columnaBorrarCurso);

        carrito.appendChild(fila);
    })
}

function limpiarCarrito() {
    while (carrito.firstElementChild) {
        carrito.removeChild(carrito.firstElementChild);
    }
}

function almacenar() {
    localStorage.setItem("carrito", JSON.stringify(contenidoCarrito));
}

function obtenerAlmacenamiento() {
    contenidoCarrito = JSON.parse(localStorage.getItem("carrito"));
}