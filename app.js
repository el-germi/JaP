const express = require("express"); //Utilizando el framework
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');

const app = express(); //instancia de express

const puerto = 3000; //todas las aplicaciones de servidor tienen que estar escuchando en un puerto específico


app.use(express.static('emercado-api-main')); // servir Json estaticos
app.use(express.static('pagina')); // servir frontend

app.use(express.json()) // peticiones con json
app.use(cors()); // permisos cors

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } else {
        res.status(400).json({ error: 'Complete los campos' });
    }
});

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token inválido' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Token no proporcionado' });
    }
}

app.post('/cart', verificarToken, (req, res) => {
    res.status(200).json({ message: 'Acceso al carrito permitido' });
});

//desafiate, el cuerpo deve ser un arreglo de productos con {id,name,count,unitCost,currency,image}
app.post('/syncCart', (req, res) => {
    let cart = JSON.parse(fs.readFileSync("./emercado-api-main/user_cart/25801.json", 'utf8'));
    let items = cart['articles'];
    let out = [];
    console.log(req.body);
    req.body.forEach(e => {
        if (e['id'] && e['name'] && e['count'] && e['unitCost'] && e['currency'] && e['image']) {
            out.push(e);
        }
    });
    if (out.length > 0) {
        //let finalitems = items.concat(out);
        let finalitems = out;
        cart['articles'] = finalitems;
        let f = JSON.stringify(cart);
        console.log(f);
        fs.writeFileSync("./emercado-api-main/user_cart/25801.json", f, { 'encoding': 'utf8', 'flag': 'w' })
    }

    res.status(204).json({ "msg": "succsess" });
});

app.listen(puerto, () => {
    console.log("Servidor funcionando.");
});