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
  console.log(res.articles)
  let productos = res.articles;
  productos.concat(JSON.parse(localStorage.getItem("prodsCarrito")) || [])
  MostrarDataProductos(productos)
}  )


function MostrarDataProductos(dataArray) {
  productos.innerHTML = "";
  
  for (const item of dataArray) {
      productos.innerHTML += `
        <img src=${item.image}>
        <div class="contenido">
          <h2>${item.name}</h2>
          <p class="descripcion">${item.count}</p>
          <p>${item.currency} ${item.unitCost} </p>
          <input type="number" value="1" min=0 onchange>
          <p> ${item.unitCost}</p>
          
        </div>
      </div>`
  
      
  }
}

