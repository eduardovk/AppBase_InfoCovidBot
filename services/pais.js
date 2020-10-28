const express = require('express');
const axios = require('axios');
const dataHora = require('../helpers/dataHora');
const formatarNumero = require('../helpers/numeros');

const router = express.Router();


class APIPais {
    constructor() { }

    async getDados() {
        var response = await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/') //solicita dados a api do corona
            .then(function (response) { //.then executa se a solicitacao responder sem erros
                return {
                    status: 200,
                    body: {
                        pais: response.data.data.country,
                        confirmados: formatarNumero(response.data.data.confirmed),
                        recuperados: formatarNumero(response.data.data.recovered),
                        obitos: formatarNumero(response.data.data.deaths),
                        atualizado_em: dataHora(response.data.data.updated_at)
                    }
                };
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


module.exports = APIPais;
