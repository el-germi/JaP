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
      <div class ="nombre">
          <div class="achicar"><img class="imgchiquita" src=${item.image}></div>  
          <h2>${item.name}</h2>
          <p>${item.currency} ${item.unitCost}</p>
          <input type="number" id="number${i}" value="${item.count}" min="0" max="10" onchange="updateVal(${i})">
          <div class="subtotal"><strong>${item.currency} </strong><p id="subtotal${i}">${item.count * item.unitCost}</p></div>
        </div>
      </div>`
  }
}

function updateVal(i) {
  document.getElementById("subtotal" + i).innerHTML = document.getElementById("number" + i).value * cartInfo[i].unitCost;
  //TODO actualizar localstorage con los counts(solo si no es del server)
  //toy viendo como hacer esto del TODO AHHH
  //despues lo hago, KAHOOT

  let arr = JSON.parse(localStorage.getItem("prodsCarrito")) || []
  let index = arr.findIndex(e=>cartInfo[i].id == prodID)
  arr[index].count = document.getElementById("number" + i).value;
  localStorage.setItem("prodsCarrito", JSON.stringify(arr));
}

