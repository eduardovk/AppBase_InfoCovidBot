const express = require('express');
const axios = require('axios');
const dataHora = require('../helpers/dataHora');
const formatarNumero = require('../helpers/numeros');

const router = express.Router();


class APIPais {
    constructor() {}
    
    //Casos Confirmados    
    async casosConfirmadosBrasil() {
        var response = await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
            .then(function (response) { //.then executa se a solicitacao responder sem erros
                let pais = response.data.data.country;
                var qtd = formatarNumero(response.data.data.confirmed); //pega a qtd de confirmados da resposta e formata
                var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
                return {
                    status: 200,
                    body: {
                        pais: pais,
                        confirmados: qtd,
                        atualizado_em: atualizadoEm
                    }
                }
            })
            .catch(function (error) { //.catch executa se houver problema na solicitacao
                return {
                    status: 500,
                    body: {
                        erro: 'Erro ao solicitar request -> ' + error
                    }
                }
            });
        return response;
    }

    async recuperadosBrasil() {
        var response = await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
            .then(function (response) { //.then executa se a solicitacao responder sem erros
                let pais = response.data.data.country;
                var qtdRecuperados = formatarNumero(response.data.data.recovered); //pega a qtd de recuperados da resposta e formata
                var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
                return {
                    status: 200,
                    body: {
                        pais: pais,
                        recuperados: qtdRecuperados,
                        atualizado_em: atualizadoEm
                    }
                }
            })
            .catch(function (error) { //.catch executa se houver problema na solicitacao
                return {
                    status: 500,
                    body: {
                        erro: 'Erro ao solicitar request -> ' + error
                    }
                }
            });
        return response;
    }

    async obitosBrasil() {
        var response = await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
            .then(function (response) { //.then executa se a solicitacao responder sem erros
                let pais = response.data.data.country;
                var qtdObitos = formatarNumero(response.data.data.deaths); //pega a qtd de obitos da resposta e formata
                var atualizadoEm = dataHora(response.data.data.updated_at); //pega ultima data de atualizacao e formata
                return {
                    status: 200,
                    body: {
                        pais: pais,
                        obitos: qtdObitos,
                        atualizado_em: atualizadoEm
                    }
                }
            })
            .catch(function (error) { //.catch executa se houver problema na solicitacao
                return {
                    status: 500,
                    body: {
                        erro: 'Erro ao solicitar request -> ' + error
                    }
                }
            });
        return response;
    }


}

//Implementar em sprint futura
//Devolver todas informacoes de uma soh vez (confirmados, obitos, recuperados, etc)
//Rota para (http://info-covid-bot.herokuapp.com/brasil)
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'TO-DO devolver todas informações país'
    });
});


module.exports = APIPais;
