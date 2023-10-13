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

        productos.forEach(e => {
            if(!prodLocal.find(p=>p.id==e.id))
            prodLocal.push(e)
        });
        localStorage.setItem("prodsCarrito", JSON.stringify(prodLocal));

        MostrarDataProductos()
    })


function MostrarDataProductos() {
    productos.innerHTML = "";
    cartInfo = JSON.parse(localStorage.getItem("prodsCarrito")) || [];
    for (let i = 0; i < cartInfo.length; i++) {
        const item = cartInfo[i];
        productos.innerHTML += `
        <div class="cart-grid">
            <div>
                <img src="${item.image}" class="img-fluid">
            </div>
            <div>
                <h6 class="text-black mb-0">${item.name}</h6>
            </div>
            <div>
                <input type="number" id="number${i}" value="${item.count}" min="1" oninput="updateVal(${i})" class="form-control form-control-sm">
            </div>
            <div>
                <div class="subtotal"><strong>${item.currency} </strong><p id="subtotal${i}">${item.count * item.unitCost}</p></div>
            </div>
            <div class="trash-icon">
                <i class="fa-solid fa-trash" onclick="del(${i})"></i> 
            </div>
        </div>
        <hr class=""></hr>`

}

function del(i) {
    let cartInfo = JSON.parse(localStorage.getItem("prodsCarrito")) || []

    cartInfo.splice(i,1);

    localStorage.setItem("prodsCarrito", JSON.stringify(cartInfo));
    
    MostrarDataProductos()
}

function updateVal(i) {
    let cartInfo = JSON.parse(localStorage.getItem("prodsCarrito")) || []

    let newCount = document.getElementById("number" + i).value;
    cartInfo[i].count = newCount;
    document.getElementById("subtotal" + i).innerHTML = newCount * cartInfo[i].unitCost;

    localStorage.setItem("prodsCarrito", JSON.stringify(cartInfo));
}

/*
    var myHeaders = new Headers();
    myHeaders.append("apikey", "L87u6fDedIWJx4VjZusOC8tOscbETQ8d");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://api.apilayer.com/fixer/convert?to={to}&from={from}&amount={amount}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
*/
}
