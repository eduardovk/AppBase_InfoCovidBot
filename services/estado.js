const express = require('express');
const axios = require('axios');
const dataHora = require('../helpers/dataHora');
const formatarNumero = require('../helpers/numeros');
const { DateTime } = require("luxon");

const router = express.Router();

class APIEstado {
    constructor() { }

    async informacoesEstado(uf, func) {
        //Para receber dados de todos estados, eh necessario informar data (yyyymmdd)
        var dataAtual = DateTime.local().setZone('America/Sao_Paulo');
        var dataPesquisa = '';
        var contadorDias = 1; //a cada tentativa volta 1 dia atras
        var retornou = false;
        var response = '';
        var limiteDias = 5; //limite de tentativas
        while (!retornou) {
            dataPesquisa = dataAtual.minus({ days: contadorDias }).toFormat('yyyyLLdd'); //diminui a qtd de dias e formata a data
            await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil/' + dataPesquisa) //solicita dados a api do corona na data especifica
                .then(function (res) { //.then executa se a solicitacao responder sem erros
                    if (res.data.data) { //se houver dados para data atual
                        for (var estado of res.data.data) { //para cada uf da resposta
                            if (estado.uf == uf.toUpperCase()) { //se for a uf pesquisada
                                var confirmados = formatarNumero(estado.cases); //pega a qtd de confirmados da resposta e formata
                                var obitos = formatarNumero(estado.deaths); //pega a qtd de obitos da resposta e formata
                                var atualizadoEm = dataHora(estado.datetime); //pega ultima data de atualizacao e formata
                                response = {
                                    status: 200,
                                    body: {
                                        uf: estado.uf,
                                        atualizado_em: atualizadoEm
                                    }
                                };
                                if(func == 'estadoCasos'){
                                    response.body.confirmados = confirmados; //adiciona qtd de confirmados a resposta
                                }else{
                                    response.body.obitos = obitos; //adiciona qtd de obitos a resposta
                                }
                                retornou = true;
                                break;
                            }
                        }
                    }
                })
                .catch(function (error) { //.catch executa se houver problema na solicitacao
                    response = {
                        status: 500,
                        body: {erro: 'Erro ao solicitar request -> ' + error}
                    };
                    retornou = true;
                });
            contadorDias++; //aumenta a qtd de dias anteriores na data para pesquisar
            if(contadorDias > limiteDias){ //caso tenha ultrapassado o limite de tentativas
                response = {
                    status: 500,
                    body: {erro: 'Dados para a UF selecionada não encontrados.'}
                };
                retornou = true;
            }
        }
        return response;
    }


}

module.exports = APIEstado;
