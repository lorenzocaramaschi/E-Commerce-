/* Desafío: Optimizando el proyecto final */

/* Voy a buscar objetos al DOM */
let carritoIcono = document.querySelector("#carrito")
let carrito = document.querySelector(".mi-carrito")
let cerrarCarrito = document.querySelector(".cerrar-carrito")
let precioTotal = document.getElementById("precioTotal")
let contadorCarrito = document.getElementById("contadorCarrito")
let botonComprar = document.getElementById("btnComprar")


/* Cuando tocamos el boton de "Comprar", se resetea el carrito */
const compraProcesada = () => {

    if (carro.length == 0) {
        /* Utilizo un Sweet Alert por si no hay productos en el carrito y el usuario clickea "Comprar" */
        Swal.fire({
            title: "Error",
            titleText: "No has seleccionado ningún producto",
            iconColor: "red",
            icon: "error",
            color: "black",
            confirmButtonText: "OK",
            confirmButtonColor: "black",
            padding: "1rem 0.3rem"
        })
    }
    else {
        /* Utilizo un Sweet Alert para decir que se proceso la compra */
        Swal.fire({
            title: "¡Su compra ha sido procesada!",
            iconColor: "#0263a0",
            icon: "success",
            color: "black",
            confirmButtonText: "OK",
            confirmButtonColor: "black",
            padding: "1rem 0.3rem"
        })
    }
    /* Spread del Carrito */
    console.log(...carro)
    carro.length = 0
    actualizarCarrito()
}
botonComprar.addEventListener("click", compraProcesada)



/* Abro Carrito */
carritoIcono.onclick = () => {
    carrito.classList.add("abrir-carrito")
}
/* Cierro carrito */
cerrarCarrito.onclick = () => {
    carrito.classList.remove("abrir-carrito")
}

/* Inicializo el array del carro en 0 */
let carro = []

/* Cuando carga el documento chequeo si habia un carrito en el storage y en caso de haberlo lo traigo */
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carro")) {
        carro = JSON.parse(localStorage.getItem("carro"))
        actualizarCarrito()
    }
})

/* Acá fui a buscar el contenedor en donde van a crearse los elementos/productos */
const contenedorProductos = document.getElementById("galeria")

/* Para cada objeto del array creo un elemento dentro del contenedor */
productos.forEach((producto) => {
    const div = document.createElement("div")
    div.classList.add("caja-carrito")
    /* Deestructuro el objeto */
    let { img, nombre, precio, id } = producto
    div.innerHTML = `
    <div class="producto" id="producto">
    <img src="${img}"  alt="imagen producto" class="imagen-producto">
    <h2 class="titulo">${nombre}</h2>
    <p class="precio">$${precio}</p>
    <button class="agregar-carrito" id="agregar${id}">Agregar al Carrito</button>
</div>`
    contenedorProductos.appendChild(div)

    let boton = document.getElementById(`agregar${producto.id}`)

    /* Si clickea en el boton depende de que id tiene el producto se lo agrega al carro */
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id)
    })
})

/* Agrego el producto al carrito dependiendo de su id */
const agregarAlCarrito = (prodId) => {
    /* Busca si el parámetro es igual al id de algún producto */
    const existe = carro.some(prod => prod.id === prodId)
    /* En caso de que si, le sumamos 1 de cantidad al producto ya seleccionado */
    if (existe) {
        const prod = carro.map(prod => {
            /* Operador Lógico AND */
            prod.id === prodId && prod.cantidad++
        })
    }
    /* Sino, agrego el producto al carrito y le pongo de cantidad "1" ya que es la primera vez que se lo selecciona */
    else {
        const item = productos.find((prod) => prod.id === prodId)
        item.cantidad = 1
        carro.push(item)

    }

    Toastify({
        text: "Añadiste un producto",
        duration: 1500,
        style: {
            background: "linear-gradient(to right, #0263a0, #01243B)",
            color: "white",
        },
        close: true,
        gravity: "bottom",
    }).showToast();

    actualizarCarrito()
}


/* Elimina el producto dentro del carrito */
const eliminarDelCarrito = (prodId) => {
    const item = carro.find((prod) => prod.id === prodId)
    /* Busco el indice del item en el carro */
    const index = carro.indexOf(item)
    /* Igualo la cantidad a 0 (por si el usuario quiere volver a agregar el producto desde 0) */
    carro[index].cantidad = 0
    /* Elimino el producto del array */
    carro.splice(index, 1)
    actualizarCarrito()
}

/* Busco el contenedor donde van a ir los items del carrito */
const contenedorCarrito = document.getElementById("carritoContenido")

/* Esta funcion actualiza el carrito en cada función que ocurre */
const actualizarCarrito = () => {
    /* Vacío el contenedor cada vez que entro para que no se repita el array por cada seleccion */
    contenedorCarrito.innerHTML = ""
    /* Para cada producto del carro creo una tarjeta de ese mismo producto */
    carro.forEach((prod) => {
        const div = document.createElement("div")
        div.className = ("caja-carrito")
        /* Deestructuro el objeto */
        let { img, nombre, precio, cantidad, id } = prod
        div.innerHTML = `
        <img src="${img}" alt="producto1" class="carrito-imagen">
        <div class="detalles">
            <div class="titulo-producto">${nombre}</div>
            <div id="precioCarrito" class="precio-carrito">${precio}</div>
            <input readonly = "readonly" id="cantidadCarrito" type="number" value="${cantidad}" class="cantidad-carrito">
        </div>
        <img class="remover-carrito" onclick = "eliminarDelCarrito(${id})"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJ9JREFUSEvt1csRwjAMRdGTSigB6IQSSAeUQCdQAp0AHZBKYFjwCzFyMgmbREuP5l3p2ZYKA0cxsL4cwBq7RCEl9r+KjAALHIMulzilcuqAa0+WPXX/DuipgZdM6g66WvWlNw7Ao8u6bU3nnSyaAI1P/93vyaIRWNRmAGZ/tAtmbZRxxn1BfURq2K2wxTwTUmGDQy4gUzdOi3ZyrBBk3AB+wyoZJl1mqQAAAABJRU5ErkJggg==" />
        `
        contenedorCarrito.appendChild(div)
        /* Lo guardo al producto en el Local Storage */
        localStorage.setItem("carro", JSON.stringify(carro))
    })

    /* El contador del carrito es igual a la longitud del carrito */
    contadorCarrito.innerText = carro.length

    /* Junto todos los precios de los productos en el array del carrito con un reduce y los conecto con el string del precio total */
    precioTotal.innerText = carro.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}