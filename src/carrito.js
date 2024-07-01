import data from "./data/productos";
// botones para acceder al carrito
const botonesAbrirCarrito = document.querySelectorAll(
  '[data-accion="abrir-carrito"]'
);
const botonesCerrarCarrito = document.querySelectorAll(
  '[data-accion="cerrar-carrito"]'
);
const ventanaCarrito = document.getElementById("carrito");
const btnAgregarCarrito = document.getElementById("agregar-al-carrito");
const producto = document.getElementById("producto");
const carrito = [];
const formatearMoneda = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

//funcion externa xq la quiero usar en varias partes. Renderizado del carrito (Calcular productos)
const renderCarrito = () => {
  ventanaCarrito.classList.add("carrito--active");

  // eliminamos todos los productos anteriores para que no se repita
  const productosAnteriores =
    ventanaCarrito.querySelectorAll(".carrito__producto");
  productosAnteriores.forEach((productoAnterior) => {
    productoAnterior.remove();
  });

  // iterar sobre cada producto y los mostramos
  carrito.forEach((productoCarrito) => {
    // obtener el precio de la BD simulada
    // cuando el id  del item del carrito = sea igual que el de la lista
    data.productos.forEach((productoBaseDatos) => {
      if (productoBaseDatos.id === productoCarrito.id) {
        productoCarrito.precio = productoBaseDatos.precio;
      }
    });

    //ruta de la imagen
    let thumbSrc = producto.querySelectorAll(".producto__thumb-img")[0].src;
    if (productoCarrito.color === "rojo") {
      thumbSrc = "./img/thumbs/rojo.jpg";
    } else if (productoCarrito.color === "amarillo") {
      thumbSrc = "./img/thumbs/amarillo.jpg";
    }

    // Se creo una palntilla del codigo HTML
    const plantillaProducto = `
            <div class="carrito__producto-info">
								<img src="${thumbSrc}" alt="" class="carrito__thumb" />
								<div>
									<p class="carrito__producto-nombre">
										<span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${
      productoCarrito.nombre
    }
									</p>
									<p class="carrito__producto-propiedades">
										Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${
      productoCarrito.color
    }</span>
									</p>
								</div>
							</div>
							<div class="carrito__producto-contenedor-precio">
								<button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path
											d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
										/>
									</svg>
								</button>
								<p class="carrito__producto-precio">${formatearMoneda.format(
                  productoCarrito.precio * productoCarrito.cantidad
                )}</p>
							</div>
        `;

    // Se creo un div
    const itemCarrito = document.createElement("div");

    // Se agrega la clase carrito__producto
    itemCarrito.classList.add("carrito__producto");

    // Se inserto la plantilla dentro del elemento
    itemCarrito.innerHTML = plantillaProducto;

    // Agregamos el producto a la ventana carrito
    ventanaCarrito.querySelector(".carrito__body").appendChild(itemCarrito);
  });
};

//Abrir carrito
botonesAbrirCarrito.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    renderCarrito();
  });
});

//cerrar carrito
botonesCerrarCarrito.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    ventanaCarrito.classList.remove("carrito--active");
  });
});

// Agregar producto al carrito
btnAgregarCarrito.addEventListener("click", (e) => {
  const id = producto.dataset.productoId;
  const nombre = producto.querySelector(".producto__nombre").innerText;
  const cantidad = parseInt(producto.querySelector("#cantidad").value);
  const color = producto.querySelector("#propiedad-color input:checked").value;
  const tamaño = producto.querySelector(
    "#propiedad-tamaño input:checked"
  ).value;

  // suma propductos similares
  if (carrito.length > 0) {
    let ProductoEnCarrito = false;

    carrito.forEach(item => {
        if(item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño){
            item.cantidad += cantidad;
            ProductoEnCarrito = true;
        }
    });
    if(!ProductoEnCarrito){ 
        carrito.push({
            id: id,
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño,
        });
    }

  } else {
    //console.log(id, nombre, cantidad, color, tamaño);
    carrito.push({
      id: id,
      nombre: nombre,
      cantidad: cantidad,
      color: color,
      tamaño: tamaño,
    });
  }
});
