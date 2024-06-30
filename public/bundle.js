'use strict';

const producto = document.getElementById('producto');
const productoImagen = producto.querySelector('.producto__imagen');
const thumbs = producto.querySelector('.producto__thumbs');

// color
const propiedadColor = producto.querySelector('#propiedad-color');

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
