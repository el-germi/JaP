const express = require("express"); //Utilizando el framework

const app = express(); //instancia de express

const puerto = 3000; //todas las aplicaciones de servidor tienen que estar escuchando en un puerto específico

//let personas = require('./api/datos.json');

app.use(express.static('emercado-api-main'));
app.use(express.static('pagina'));


app.listen(puerto, ()=>{
    console.log("Servidor funcionando.");
});