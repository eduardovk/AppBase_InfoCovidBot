const express = require('express');

const app = express();

const rotaStatus = require('./routes/status'); //importa arquivo status.js

//definicao de cabecalhos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //header para permitir Cross-Origin
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    //se o metodo do request for OPTIONS, retorna cabecalho com lista de metodos aceitos
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({}); //envia resposta vazia
    }

    next(); //chama o proximo middleware
});

app.use('/status', rotaStatus); //define a rota status

//quando não encontra a rota, devolve erro
app.use((req, res, next) => {
    const erro = new Error("Não encontrado"); //define message do erro
    erro.status = 404; //define status do erro
    next(erro); //passa a variavel 'erro' para o proximo middleware (abaixo)
});

//captura e exibe msgs de erro
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;