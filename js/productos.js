const productos = [
    // Cajas de alimentación
    {
        id: "caja-1",
        titulo: "1 Caja de alimento",
        imagen: "../images/Caja-alimento.png",
        categoria: {
            nombre: "Alimentos",
            id: "alimentos"
        },
        peso: 20
    },
    {
        id: "caja-2",
        titulo: "2 Cajas de alimento",
        imagen: "../images/Caja-alimento-2.png",
        categoria: {
            nombre: "Alimentos",
            id: "alimentos"
        },
        peso: 40
    },
    {
        id: "caja-3",
        titulo: "3 Cajas de alimento",
        imagen: "../images/Caja-alimento-3.png",
        categoria: {
            nombre: "Alimentos",
            id: "alimentos"
        },
        peso: 60
    },
    // Ropa y accesorios
    {
        id: "set-1",
        titulo: "Set de exploración básico",
        imagen: "../images/Exploracion-set.jpeg",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        peso: 20
    },
    {
        id: "set-2",
        titulo: "Radio para exploración",
        imagen: "../images/Exploracion-radio.png",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        peso: 40
    },
    {
        id: "set-3",
        titulo: "Comunicador profesional",
        imagen: "../images/Exploracion-comunicador.jpg",
        categoria: {
            nombre: "Ropa",
            id: "ropa"
        },
        peso: 60
    },
    // Tecnología y hogar
    {
        id: "macetas",
        titulo: "Macetas grandes",
        imagen: "../images/Macetas-XL.jpg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 30
    },
    {
        id: "sistema-cultivo",
        titulo: "2 Sistemas de cultivo",
        imagen: "../images/Sistemas-de-cultivo-hidro.png",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 60
    },
    {
        id: "asistente-cocina",
        titulo: "Asistente de cocina",
        imagen: "../images/Tecnología-asistente-cocina.jpg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 8
    },
    {
        id: "cocina",
        titulo: "Cocina digital",
        imagen: "../images/Tecnología-cocina.jpg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 20
    },
    {
        id: "climatizador",
        titulo: "Equipos de climatización",
        imagen: "../images/Tecnología-equipos-climatizacion.jpg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 50
    },
    {
        id: "frigobar",
        titulo: "Frigobar",
        imagen: "../images/Tecnología-frigobar.jpg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 15
    },
    {
        id: "generador",
        titulo: "Generador de energía",
        imagen: "../images/Tecnología-generador-energía.png",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 30
    },
    {
        id: "panel-solar",
        titulo: "Paneles solares",
        imagen: "../images/Tecnología-panel-solar.png",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 30
    },
    {
        id: "purificador-aire",
        titulo: "Purificador de aire",
        imagen: "../images/Tecnología-Purificador-de-aire.jpg",
        categoria: {
            nombre: "Hogar",
            id: "hogar"
        },
        peso: 6
    },
    // Salud y bienestar
    {
        id: "diadema",
        titulo: "Diadema para meditación",
        imagen: "../images/Salud-diadema.jpg",
        categoria: {
            nombre: "Salud",
            id: "salud"
        },
        peso: 3
    },
    {
        id: "rastreador-salud",
        titulo: "Dispositivo rastreador de salud",
        imagen: "../images/Salud-dispositivo.jpg",
        categoria: {
            nombre: "Salud",
            id: "salud"
        },
        peso: 1
    },
    {
        id: "kit-salud",
        titulo: "Kit de primeros auxilios",
        imagen: "../images/Salud-Kit.jpg",
        categoria: {
            nombre: "Salud",
            id: "salud"
        },
        peso: 5
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloPrincipal = document.querySelector("#main-title");
let botonesAgregar = document.querySelectorAll(".btn-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="product-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="product-details">
                <h3 class="product-title">${producto.titulo}</h3>
                <p class="product-kg">${producto.peso} kg</p>
                <button class="btn-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
    
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach( boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}