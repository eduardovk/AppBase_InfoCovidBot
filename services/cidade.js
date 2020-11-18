const express = require('express');
const axios = require('axios');
const dataHora = require('../helpers/dataHora');
const formatarNumero = require('../helpers/numeros');
const nomeEstado = require('../helpers/nomeEstado');
const titleCase = require('../helpers/titleCase');
const { DateTime } = require("luxon");
const options = {
    headers: { 'Authorization': 'Token 0187681193ddbb135c3184451f36304cb7939971' } //token da API brasil.io
};

const router = express.Router();

class APICidade {
    constructor() { }

    async getDados(cidade) {
        if (!cidade || cidade.trim() == '') {
            return { //se a cidade nao foi informada corretamente, retorna erro
                status: 500,
                body: { erro: 'A cidade não foi informada corretamente!' }
            };
        }

        var param = encodeURI(titleCase(cidade)); //capitaliza a string e filtra para parametro url

        var response = await axios.get('https://api.brasil.io/v1/dataset/covid19/caso/data/?city=' + param + '&format=json', options) //solicita dados a api brasil.io
            .then(function (response) { //.then executa se a solicitacao responder sem erros
                if (response.data.results) {
                    var info = response.data.results[0]; //primeiro resultado da lista, o mais atualizado
                    return {
                        status: 200,
                        body: {
                            cidade: info.city,
                            estado: nomeEstado(info.state),
                            confirmados: formatarNumero(info.confirmed),
                            obitos: formatarNumero(info.deaths),
                            atualizado_em: dataHora(info.date, false)
                        }
                    };
                }
            })
            .catch(function (error) { //.catch executa se houver problema na solicitacao
                if (error.response.status == 400) {
                    return {
                        status: 400,
                        body: {
                            erro: 'A cidade não foi encontrada.'
                        }
                    }
                }
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

module.exports = APICidade;
