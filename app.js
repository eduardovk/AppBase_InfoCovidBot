const express = require('express');

const app = express();

const rotaStatus = require('./routes/status'); //importa arquivo status.js

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