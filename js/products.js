let numero = localStorage.getItem("catID");

let URL_InfoAutos = `https://japceibal.github.io/emercado-api/cats_products/${numero}.json`;

let arrayOriginal = [];

let filtroBusqueda = null;
let filtroPrecio = null;
let orden = null;

fetch(URL_InfoAutos)
    .then(res => res.json())
    .then(res => {
        arrayOriginal = res.products;
        MostrarData(arrayOriginal);
    });

function recalcular() {
    let arr = arrayOriginal;
    if (filtroPrecio)
        arr = arr.filter(filtroPrecio);
    if (filtroBusqueda)
        arr = arr.filter(filtroBusqueda);
    if (orden)
        arr.sort(orden);
    MostrarData(arr);
}

const productos = document.getElementById("productos");

function MostrarData(dataArray) {
    productos.innerHTML = "";
    for (const item of dataArray) {
        productos.innerHTML += `
        <div class="cuadrante">
          <img src="${item.image}">
          <div class="contenido">
            <h2>${item.name} ${item.currency} ${item.cost}</h2>
            <p class="descripcion">${item.description}</p>
          </div>
          <div class="vendidos">
            <span>${item.soldCount} vendidos</span>
          </div>
        </div>`;
    }
}

function TBD() {
    const min = parseFloat(precioMin.value);
    const max = parseFloat(precioMax.value);

    if (!isNaN(min) && !isNaN(max)) {
        filtroPrecio = producto => producto.cost >= min && producto.cost <= max;
    } else if (!isNaN(min) || !isNaN(max)) {
        filtroPrecio = producto => producto.cost >= min || producto.cost <= max;
    } else {
        filtroPrecio = null;
    }

    recalcular();
}

document.addEventListener("DOMContentLoaded", () => {

    const busqueda = document.getElementById("search");
    const precioMin = document.getElementById("precioMin");
    const precioMax = document.getElementById("precioMax");

    busqueda.value = "";
    precioMin.value = "";
    precioMax.value = "";

    document.getElementById("ordenarAscendente").addEventListener("click", function () {
        orden = (a, b) => a.cost - b.cost;
        recalcular();
    });

    document.getElementById("ordenarDescendente").addEventListener("click", function () {
        orden = (a, b) => b.cost - a.cost;
        recalcular();
    });

    document.getElementById("ordenarRelevancia").addEventListener("click", function () {
        orden = (a, b) => b.soldCount - a.soldCount;
        recalcular();
    });

    busqueda.addEventListener("input", () => {
        const querry = clean(busqueda.value);
        if (querry.length > 0)
            filtroBusqueda = elem => clean(elem.name).includes(querry) || clean(elem.description).includes(querry)
        else
            filtroBusqueda = null;
        recalcular();
    });

    precioMin.addEventListener("input", TBD);
    precioMax.addEventListener("input", TBD);
    //document.getElementById("aplicarFiltroPrecio").addEventListener("click", TBD);

    document.getElementById("limpiarFiltroPrecio").addEventListener("click", function () {
        precioMin.value = "";
        precioMax.value = "";
        busqueda.value = "";

        filtroBusqueda = null;
        filtroPrecio = null;
        recalcular();
    });

});

function clean(filtrador) {//https://stackoverflow.com/questions/5700636/using-javascript-to-perform-text-matches-with-without-accented-characters
    return filtrador.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}