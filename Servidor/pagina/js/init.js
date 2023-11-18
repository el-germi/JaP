const CATEGORIES_URL = "http://localhost:3000/cats/cat.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/buy.json";
const EXT_TYPE = ".json";

// Mostrar sesión 
const userSession = JSON.parse(localStorage.getItem("user"));
if (userSession && userSession.mail) {
    const userDisplay = document.getElementById("userDisplay");
    userDisplay.textContent = `¡Hola ${userSession.mail}!`;
}

// Cerrar Sesión
document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear()
    location.href = "login.html"
});

// Obtener ID del producto
const setProdID = (id) => {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
};

// -------------------------------------

let showSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
    document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
    let result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function (error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}