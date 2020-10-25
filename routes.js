const express = require('express');
const router = express.Router();
const ApiPais = require('./services/pais');


router.get('/ping', (req, res) => {
    res.send(send(200));
});

router.post('/', async (req, res) => {
    let response, data;
    if(!checkRequestBody(req.body)){
        log('error', 'Campos inválidos'); 
        response = send(400)
    }
    else{
        log('request', `Função: ${req.body.function}`);
        switch (req.body.function) {
            case 'ping':
                response = send(200, 'ping!');
                break;
            case 'paisCasos': 
                // response = send(200, api.validateCpf(req.body.params));
                break;
            case 'paisMortos':
                // data = await api.login(req.body.params);
                // response = data ? send(200, data) : send(400);
                break;
            default:
                log('error', 'Requisição não identificada');
                response = send(404);
                break;
        }
    }
    res.status(response.statusCode).send(response);
});

router.all('/*', (req, res) => {
    log('error', 'Caminho inválido');
    res.status(404).send(send(404))
});

module.exports = router;