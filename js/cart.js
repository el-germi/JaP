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

let usuario="25801";
let URL= `https://japceibal.github.io/emercado-api/user_cart/${usuario}.json`;

fetch(URL)
.then(res => {
   if (res.ok) {
   return res.json();
    }})
.then(res =>{
  let productos = res.articles;
  let prodLocal = JSON.parse(localStorage.getItem("prodsCarrito")) || []
  console.log(productos)
  console.log(prodLocal)
  let masProds = productos.concat(prodLocal)

  console.log(masProds)
  MostrarDataProductos(masProds)
}  )


function MostrarDataProductos(dataArray) {
  productos.innerHTML = "";
  for (const item of dataArray) {
    
      productos.innerHTML += `
        <img src=${item.image}>
        <div class="nombre">
          <h2>${item.name}</h2>
          <p class="descripcion">${item.count}</p>
          <p>${item.currency} ${item.unitCost} </p>
          <input type="number" id"number" value="1" min=0>
          <p> <strong> ${item.currency} ${item.unitCost} </strong></p> 
          
        </div>
      </div>

      `
  }
}  

