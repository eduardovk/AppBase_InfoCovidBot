const express = require('express');
const router = express.Router();
const ApiPais = require('./services/pais');
const ApiEstado = require('./services/estado');

router.get('/ping', (req, res) => {
    res.status(200).send('ping! (get)');
});

//---------- ROTAS GET -----------------------------------//
router.get('/status', async (req, res) => {
    res.status(200).send({ mensagem: 'Em desenvolvimento!' });
});

router.get('/dadosPais', async (req, res) => {
    apiPais = new ApiPais();
    let response = await apiPais.getDados(); //todas informacoes
    res.status(response.status).send(response.body);
});

router.get('/dadosEstado/:uf', async (req, res) => {
    apiEstado = new ApiEstado();
    let uf = req.params.uf;
    let response = await apiEstado.getDados(uf); //todas informacoes
    res.status(response.status).send(response.body);
});

//------------------------------------------------------//

//-------- ROTAS POST ----------------------------------//
router.post('/', async (req, res) => {
    var response;
    var uf;
    switch (req.body.function) {
        case 'ping':
            res.status(200).send('ping! (post)');
            break;
        case 'dadosPais':
            apiPais = new ApiPais();
            response = await apiPais.getDados(); //todas informacoes
            res.status(response.status).send(response.body);
            break;
        case 'dadosEstado':
            apiEstado = new ApiEstado();
            uf = req.body.uf;
            response = await apiEstado.getDados(uf); //todas informacoes
            res.status(response.status).send(response.body);
            break;
        default:
            res.status(404).send({
                erro: 'Requisição não identificada'
            });
            break;
    }
});
//------------------------------------------------------------------//

router.all('/*', (req, res) => {
    res.status(404).send({
        erro: 'Caminho Inválido'
    });
});

module.exports = router;