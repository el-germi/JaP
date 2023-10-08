let btnSwitch = document.getElementById("switch");

// Recupera el estado del modo oscuro desde el localStorage
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Aplica el modo oscuro si estaba activado
if (isDarkMode) {
    document.body.classList.add("dark");
    btnSwitch.classList.add("active");
}

// Agrega un evento de clic al botón
btnSwitch.addEventListener("click", () => {
    // Alterna la clase "dark" en el cuerpo del documento
    document.body.classList.toggle("dark");

    // Alterna la clase "active" en el propio botón
    btnSwitch.classList.toggle("active");

    // Guarda el estado actual del modo oscuro en el localStorage
    const isDarkModeActive = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkModeActive);
});


// ---------------------------------------
// FUNCIONALIDAD DEL CARRITO
// ---------------------------------------

let cartInfo = []
let usuario = "25801";
let URL = `https://japceibal.github.io/emercado-api/user_cart/${usuario}.json`;

fetch(URL)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(res => {
        let productos = res.articles;
        let prodLocal = JSON.parse(localStorage.getItem("prodsCarrito")) || []
        let masProds = productos.concat(prodLocal)
        cartInfo = masProds;
        MostrarDataProductos()
    })


function MostrarDataProductos() {
    productos.innerHTML = "";
    for (let i = 0; i < cartInfo.length; i++) {
        const item = cartInfo[i];
        productos.innerHTML += `
        <div class="row mb-4 d-flex justify-content-between align-items-center">
            <div class="col">
                <img src="${item.image}" class="img-fluid">
            </div>
            <div class="col">
                <h6 class="text-black mb-0">${item.name}</h6>
            </div>
            <div class="col">
                <input type="number" id="number${i}" value="${item.count}" min="1" oninput="updateVal(${i})" class="form-control form-control-sm">
            </div>
            <div class="col">
                <div class="subtotal"><strong>${item.currency} </strong><p id="subtotal${i}">${item.count * item.unitCost}</p></div>
            </div>
        </div>
        <hr class=""></hr>`
        // No funca el grid xd lo intentaré hacer en otro momento
        // por que no una tabla? con bootstrap deve haber algo que la haga medio cheta
    }
}

function updateVal(i) {
    let arr = JSON.parse(localStorage.getItem("prodsCarrito")) || []
    let index = arr.findIndex(e => e.id == cartInfo[i].id)

    if(index > -.5) {//if found => it's from localstorage
        let newCount = document.getElementById("number" + i).value;

        //update localstorage
        arr[index].count = newCount;
        localStorage.setItem("prodsCarrito", JSON.stringify(arr));

        //update subtotal column
        document.getElementById("subtotal" + i).innerHTML = newCount * cartInfo[i].unitCost;

    } else {//if not then its from server
        alert("Server ammounts can't be modified (yet)");
    }
}