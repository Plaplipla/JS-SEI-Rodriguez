let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

fetch('../js/planetas.json')
    .then(response => response.json())
    .then(data => {
        const planetas = data;
        cargarPlanetas(planetas);
    });

const pDestino = document.querySelector("#pdestino");

function cargarPlanetas(pElegido) {
    pDestino.innerHTML = "";

    pElegido.forEach(planeta => {
        const div = document.createElement("div");
        div.classList.add("planeta-destino");
        div.innerHTML = `
            <img class="planeta-img" id="planeta-imagen" src="${planeta.imagen}" alt="${planeta.nombre}">
            <div class="button-pdestino">${planeta.nombre}</div>
            <p class="planetaVe" id="planetaVe" data-velocidad-escape="${planeta.velocidadEscape}">Costo envío: ${planeta.velocidadEscape}</p>
        `;
        //actualizarTotal()

        const button = div.querySelector(".button-pdestino");
        const paragraph = div.querySelector(".planetaVe");
        paragraph.style.display = "none";

        div.addEventListener("click", () => {
            const velocidadEscape = div.querySelector(".planetaVe").getAttribute("data-velocidad-escape");
            actualizarTotal(velocidadEscape);

            const allButtons = document.querySelectorAll(".button-pdestino");
            allButtons.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove("selected");
                }
            });

            const allParagraphs = document.querySelectorAll(".planetaVe");
            allParagraphs.forEach(p => {
                if (p !== paragraph) {
                    p.style.display = "none";
                }
            });

            if (button.classList.contains("selected")) {
                paragraph.style.display = "none";
                button.classList.remove("selected");
            } else {
                button.classList.add("selected");
                paragraph.style.display = "block";
            }
        });

        paragraph.addEventListener("click", (event) => {
            event.stopPropagation();
            paragraph.style.display = "none";
            button.classList.remove("selected");
        });

        pDestino.append(div);
    });
}

const contenedorCarritoVacio = document.querySelector("#empty-cart");
const contenedorCarritoProductos = document.querySelector("#cart-products");
const contenedorCarritoAcciones = document.querySelector("#cart-actions");
const contenedorCarritoComprado = document.querySelector("#cart-bought");
const contenedorCarritoEnvio = document.querySelector("#cart-shipping");
let botonesEliminar = document.querySelectorAll(".cart-product-remove");
const botonVaciar = document.querySelector("#cart-actions-empty");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#cart-actions-buy");

const precioPorKg = 100;

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoEnvio.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = `
                <img class="cart-product-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="cart-product-title">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="cart-product-weight">
                    <small>Peso c/u</small>
                    <p>${producto.peso}</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.peso * producto.cantidad * precioPorKg}</p>
                </div>
                <div class="cart-product-quantity">
                    <button class="btn-quantity btn-decrease">-</button>
                    <button class="btn-quantity btn-increase">+</button>
                </div>
                <button class="cart-product-remove" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);

            const btnDecrease = div.querySelector(".btn-decrease");
            const btnIncrease = div.querySelector(".btn-increase");

            btnDecrease.addEventListener("click", () => actualizarCantidad(producto.id, "decrease"));
            btnIncrease.addEventListener("click", () => actualizarCantidad(producto.id, "increase"));
        });

        actualizarBotonesEliminar();
        actualizarTotal();
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoEnvio.classList.add("disabled")
    }
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".cart-product-remove");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarCantidad(idProducto, action) {
    const producto = productosEnCarrito.find(producto => producto.id === idProducto);

    if (producto) {
        if (action === "decrease" && producto.cantidad > 1) {
            producto.cantidad--;
        } else if (action === "increase") {
            producto.cantidad++;
        }

        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}

function actualizarTotal(velocidadEscape) {
    let ve = velocidadEscape || 1;
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.peso * producto.cantidad * precioPorKg * ve), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoEnvio.classList.add("disabled");

    Swal.fire({
        title: "¡Orden de compra generada!",
        text: "Se ha generado tu orden de compra. Pronto recibirás los detalles en tu correo electrónico.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}