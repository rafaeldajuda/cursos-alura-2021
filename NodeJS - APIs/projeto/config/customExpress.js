const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());
    app.use(bodyParser.json());

    consign()                       // executa o consig
        .include('controllers')     // importa todos os modulos de dentro da pasta mencionada
        .into(app);                 // passa para o APP express os modulos importados    
    
    return app;
}