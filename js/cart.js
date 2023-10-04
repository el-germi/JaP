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
  for (let i = 1; i < cartInfo.length + 1; i++) {
    const item = cartInfo[i - 1];
    productos.innerHTML += `
        
       <div class ="nombre">
       <div class="achicar"><img class="imgchiquita" src=${item.image}></div>  
          <h2>${item.name}</h2>
          <p>${item.currency} ${item.unitCost} </p>
          <input type="number" id="number${i}" value="${item.count}" attr_id="${i}" min=0>
          <p id="subtotal${i}"> <strong> ${item.currency}</strong></p> 
        </div>
      </div>

      `
    document.getElementById("number" + i).addEventListener("change", updateValues);
  }
}


function updateValues(evento) {
  let i = evento.target.getAttribute("attr_id");
  console.log(i);
  document.getElementById("subtotal" + i).innerHTML = document.getElementById("number" + i).value * cartInfo[i-1].unitCost;

  //let cantidad = e.source.value;
  //let cuenta = precio * cantidad

  //return cuenta;

}

setInterval(updateValues, 500); 