'use strict';

const producto$1 = document.getElementById('producto');
const productoImagen = producto$1.querySelector('.producto__imagen');
const thumbs = producto$1.querySelector('.producto__thumbs');

// color
const propiedadColor = producto$1.querySelector('#propiedad-color');

// cantidad
const btnIncrementarCantidad = producto$1.querySelector('#incrementar-cantidad');
const btnDisminuirCantidad = producto$1.querySelector('#disminuir-cantidad');
const inputCantidad = producto$1.querySelector('#cantidad');


// funcionalida de las thumbnails
thumbs.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG') {
        // ruta completa de la imagen
        const imagenSrc = e.target.src;

        // obtenemos la posicion del ultimo /
        const lastIndex = imagenSrc.lastIndexOf('/');

        // cortamos la cadena de texto para obtner solamente una parte
        const nombreImagen= imagenSrc.substring(lastIndex + 1);

        // cambiamos la ruta de la imagen
        productoImagen.src = `img/thumbs/${nombreImagen}`;
    }
});

// Funcionalidad de la propiedad de los colores
propiedadColor.addEventListener('click', (e) =>{
    if(e.target.tagName === 'INPUT'){

        productoImagen.src = `./img/tennis/${e.target.value}.jpg`;

    }
    
});

// botones + -
btnIncrementarCantidad.addEventListener('click', (e) => {
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
});

btnDisminuirCantidad.addEventListener('click', (e) => {
    if(parseInt(inputCantidad.value) > 1)
    inputCantidad.value = parseInt(inputCantidad.value) - 1;
});

// botones para acceder al carrito
const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const ventanaCarrito = document.getElementById('carrito');
const btnAgregarCarrito = document.getElementById('agregar-al-carrito');
const producto = document.getElementById('producto');
const carrito = [];

//funcion externa xq la quiero usar en varias partes
const renderCarrito = () => {
    ventanaCarrito.classList.add('carrito--active');
    
    console.log(carrito);
};

//Abrir carrito
botonesAbrirCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        renderCarrito();
    });
});

//cerrar carrito
botonesCerrarCarrito.forEach((boton) => {
    boton.addEventListener('click', (e) => {
        ventanaCarrito.classList.remove('carrito--active');
    });
});

// Agregar producto al carrito
btnAgregarCarrito.addEventListener('click', (e) => {
    const id = producto.dataset.productoId;
    const nombre = producto.querySelector('.producto__nombre').innerText;
    const cantidad = parseInt(producto.querySelector('#cantidad').value);
    const color = producto.querySelector('#propiedad-color input:checked').value;
    const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;

    //console.log(id, nombre, cantidad, color, tamaño);
    carrito.push({
        id: id, 
        nombre: nombre, 
        cantidad: cantidad, 
        color: color,
        tamaño: tamaño,
    });
        
});
