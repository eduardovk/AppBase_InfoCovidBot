const express = require('express');
const router = express.Router();
const ApiPais = require('./services/pais');

router.get('/ping', (req, res) => {
    res.status(200).send('ping! (get)');
});

//---------- ROTAS GET -----------------------------------//
router.get('/status', async (req, res) => {
    res.status(200).send({mensagem: 'Em desenvolvimento!'});
});

router.get('/confirmadosPais', async (req, res) => {
    apiPais = new ApiPais();
    let response = await apiPais.casosConfirmadosBrasil();
    res.status(response.status).send(response.body);
});

router.get('/recuperadosPais', async (req, res) => {
    apiPais = new ApiPais();
    let response = await apiPais.recuperadosBrasil();
    res.status(response.status).send(response.body);
});

router.get('/obitosPais', async (req, res) => {
    apiPais = new ApiPais();
    let response = await apiPais.obitosBrasil();
    res.status(response.status).send(response.body);
});
//------------------------------------------------------//

//-------- ROTAS POST ----------------------------------//
router.post('/', async (req, res) => {
    var response;
    if (false/*!checkRequestBody(req.body)*/) {
        //log('error', 'Campos inválidos'); 
        //response = send(400)
    }
    else {
        switch (req.body.function) {
            case 'ping':
                res.status(200).send('ping! (post)');
                break;
            case 'paisCasos':
                apiPais = new ApiPais();
                response = await apiPais.casosConfirmadosBrasil();
                res.status(response.status).send(response.body);
                break;
            case 'paisRecuperados':
                apiPais = new ApiPais();
                response = await apiPais.recuperadosBrasil();
                res.status(response.status).send(response.body);
                break;
            case 'paisObitos':
                apiPais = new ApiPais();
                response = await apiPais.obitosBrasil();
                res.status(response.status).send(response.body);
                break;
            default:
                res.status(404).send({
                    erro: 'Requisição não identificada'
                });
                break;
        }
    }
});
//------------------------------------------------------------------//

router.all('/*', (req, res) => {
    res.status(404).send({
        erro: 'Caminho Inválido'
    });
});

module.exports = router;