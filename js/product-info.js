// Entrega3Parte3
let comentarios = []
const prodID = localStorage.getItem("prodID")
const URLComentarios = PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE


// función para mostrar cada uno de los comentarios en product-info.html
function mostrarComentarios() {
    contenidoHTML = ""
    comentarios.forEach((comentario) => {
        contenidoHTML += `
        <div class="card mb-3">
            <div class="">
                <p>${comentario.user} - ${comentario.dateTime}</p>
                <div>${estrellas(comentario.score)}</div>
                <p>${comentario.description}</p>
            </div>
        </div>`
    })

    document.getElementById("comentarios").innerHTML = contenidoHTML;
}


// función para mostrar estrellas en los comentarios
function estrellas(score) {
    let estrella = ``
    for (let i = 0; i < 5; i++) {
        if (i < score) {
            estrella += `<i class="fa fa-star checked"></i>`
        } else {
            estrella += `<i class="fa fa-star"></i>`
        }
    }

    return estrella;
}

function pad(a) {
    return ("" + a).padStart(2, '0');
}

function getTime() {
    const now = new Date();
    return "" + now.getFullYear() + "-" + pad(now.getMonth()) + "-" + pad(now.getDate()) + " " +
        pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds())
    /*    2020-02-21 15:05:22

    getFullYear() - Returns the 4-digit year
    getMonth() - Returns a zero-based integer (0-11) representing the month of the year.
    getDate() - Returns the day of the month (1-31).
    getHours() - Returns the hour of the day (0-23).
    getMinutes() - Returns the minute (0-59).
    getSeconds() - Returns the second (0-59). 
    */
}

document.addEventListener("DOMContentLoaded", () => {

    // obtener los comentarios del json
    getJSONData(URLComentarios).then((result) => {
        if (result.status === "ok") {
            comentarios = result.data;
            //mostrarComentarios();
        }
    }).then(()=>{
        let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios = comentarios.concat(comentariosGuardados.filter(e=>e.product==prodID));
        mostrarComentarios();
    })

  
    let boton = document.getElementById("comentar");

    boton.addEventListener("click", () => {
        let comentario = document.getElementById("texto").value
        let valorEstrella = document.getElementById("stars").value
        let tiempo = getTime();
        let user = JSON.parse(localStorage.getItem("user"));
        let comentarioData = {
            user: user.mail,
            description: comentario,
            score: valorEstrella,
            dateTime: tiempo,
            product: prodID
        };

        comentarios.push(comentarioData);
        let comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentariosGuardados.push(comentarioData);
        localStorage.setItem("comentarios", JSON.stringify(comentariosGuardados));

        //alert("Nuevo comentario guardado con exito");
        Swal.fire(
            'Enviado!',
            'Nuevo comentario guardado con exito',
            'success'
        )

        document.getElementById("texto").value = "";
        document.getElementById("stars").value = "";
        mostrarComentarios();
    })

})

function obtenerDatosDelProducto(productId) {
    let productInfoUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    fetch(productInfoUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("No se pudo obtener la información del producto.");
        })
        .then(productData => {
            mostrarDatosDelProducto(productData);
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);
        });
}

function mostrarDatosDelProducto(productData) {
    let productName = document.getElementById("nombre-producto");
    let productPrice = document.getElementById("precio-producto");
    let productDescription = document.getElementById("descripcion-producto");
    let productCategory = document.getElementById("categoria-producto");
    let productSoldCount = document.getElementById("vendidos-producto");
    let productImages = document.getElementById("imagenes-producto");

    productName.textContent = productData.name;

    if (productData.currency === "USD") {
        productPrice.textContent = `Precio: ${productData.currency} ${productData.cost}`;
    } else {
        productPrice.textContent = `Precio: ${productData.currency} ${productData.cost}`;
    }

    productDescription.textContent = `Descripción: ${productData.description}`;
    productCategory.textContent = `Categoría: ${productData.category}`;
    productSoldCount.textContent = `Vendidos: ${productData.soldCount}`;

    productImages.innerHTML = "";

    for (let imageSrc of productData.images) {
        let imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        productImages.appendChild(imgElement);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let productId = localStorage.getItem("prodID");

    if (productId) {
        obtenerDatosDelProducto(productId);
    }
});


