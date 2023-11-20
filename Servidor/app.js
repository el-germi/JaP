const express = require("express"); //Utilizando el framework
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express(); //instancia de express

const puerto = 3000; //todas las aplicaciones de servidor tienen que estar escuchando en un puerto específico

//let personas = require('./api/datos.json');

app.use(express.static('emercado-api-main'));
app.use(express.static('pagina'));

app.use(express.json()) // peticiones con json
app.use(cors()); // permisos cors

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const token = jwt.sign({email}, 'secretkey', { expiresIn: '1h' }); 
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } else {
        res.status(400).json({ error: 'Complete los campos' });
    }
});


app.listen(puerto, ()=>{
    console.log("Servidor funcionando.");
});