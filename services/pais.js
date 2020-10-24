const express = require('express');
const axios = require('axios');
const dataHora = require('../helpers/dataHora');
const formatarNumero = require('../helpers/numeros');

const router = express.Router();


class APIPais {
    constructor(){

    }
    //Casos Confirmados    
    async casosConfirmadosBrasil(){   
        axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
        .then(function (response) { //.then executa se a solicitacao responder sem erros
            let pais = response.data.data.country;
            var qtd = formatarNumero(response.data.data.confirmed); //pega a qtd de confirmados da resposta e formata
            var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
            res.status(200).send({ //configura status como 200 (ok), cria corpo da msg e envia
                pais: pais,
                casosConfirmados: qtd,
                atualizado_em: atualizadoEm
            });
        })
        .catch(function (error) { //.catch executa se houver problema na solicitacao
            res.status(500).send({ //configura status como 500 (erro no servidor), cria corpo da msg e envia
                erro: 'Erro ao solicitar request -> ' + error
            });
        });
    }
}


//Devolve qtd. de confirmados no brasil
//Rota para (http://info-covid-bot.herokuapp.com/pais/confirmados)
router.get('/casosConfirmados', (req, res, next) => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
        .then(function (response) { //.then executa se a solicitacao responder sem erros
            let pais = response.data.data.country;
            var qtd = formatarNumero(response.data.data.confirmed); //pega a qtd de confirmados da resposta e formata
            var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
            res.status(200).send({ //configura status como 200 (ok), cria corpo da msg e envia
                pais: pais,
                casosConfirmados: qtd,
                atualizado_em: atualizadoEm
            });
        })
        .catch(function (error) { //.catch executa se houver problema na solicitacao
            res.status(500).send({ //configura status como 500 (erro no servidor), cria corpo da msg e envia
                erro: 'Erro ao solicitar request -> ' + error
            });
        });
});

//Devolve qtd. de casos recuperados no brasil
//Rota para (http://info-covid-bot.herokuapp.com/pais/casosRecuperados)
router.get('/casosRecuperados', (req, res, next) => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
        .then(function (response) { //.then executa se a solicitacao responder sem erros
            let pais = response.data.data.country;
            var qtdRecuperados = formatarNumero(response.data.data.recovered); //pega a qtd de recuperados da resposta e formata
            var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
            res.status(200).send({ //configura status como 200 (ok), cria corpo da msg e envia
                pais: pais,
                casosRecuperados: qtdRecuperados,
                atualizado_em: atualizadoEm
            });
        })
        .catch(function (error) { //.catch executa se houver problema na solicitacao
            res.status(500).send({ //configura status como 500 (erro no servidor), cria corpo da msg e envia
                erro: 'Erro ao solicitar request -> ' + error
            });
        });
});

//Devolve qtd. de obitos no brasil
//Rota para (http://info-covid-bot.herokuapp.com/pais/obitos)
router.get('/obitos', (req, res, next) => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
        .then(function (response) { //.then executa se a solicitacao responder sem erros
            let pais = response.data.data.country;
            var qtdObitos = formatarNumero(response.data.data.deaths); //pega a qtd de obitos da resposta e formata
            var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
            res.status(200).send({ //configura status como 200 (ok), cria corpo da msg e envia
                pais: pais,
                obitos: qtdObitos,
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


module.exports = APIPais;
