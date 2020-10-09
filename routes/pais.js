const express = require('express');
const axios = require('axios');
const dataHora = require('../helpers/dataHora');
const formatarNumero = require('../helpers/numeros');

const router = express.Router();

//Devolve qtd. de confirmados no brasil
//Rota para (http://info-covid-bot.herokuapp.com/pais/confirmados)
router.get('/confirmados', (req, res, next) => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
        .then(function (response) { //.then executa se a solicitacao responder sem erros
            var qtd = formatarNumero(response.data.data.confirmed); //pega a qtd de confirmados da resposta e formata
            var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
            res.status(200).send({ //configura status como 200 (ok), cria corpo da msg e envia
                confirmados: qtd,
                atualizado_em: atualizadoEm
            });
        })
        .catch(function (error) { //.catch executa se houver problema na solicitacao
            res.status(500).send({ //configura status como 500 (erro no servidor), cria corpo da msg e envia
                erro: 'Erro ao solicitar request -> ' + error
            });
        });
});


//Implementar em sprint futura
//Devolver todas informacoes de uma soh vez (confirmados, obitos, recuperados, etc)
//Rota para (http://info-covid-bot.herokuapp.com/brasil)
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'TO-DO devolver todas informações país'
    });
});

module.exports = router;
