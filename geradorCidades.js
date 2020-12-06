// Gera arquivo CSV para importar durante a criação de Entity de cidades no Watson Assistant
// Utiliza como sinonimos o nome da cidade, o nome sem acentos, o nome sem hifen, e o nome sem acentos e sem hifen
// Ex.: Não-Me-Toque, Nao-Me-Toque, Não Me Toque, Nao Me Toque
// OBS.: o primeiro campo de cada linha será o nome da Entity do Watson (nesse caso, 'Cidades')

const axios = require('axios');
const { exception } = require('console')
const { exit } = require('process');
var fs = require('fs');

const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function removeAcentos(nome) {
    var str = nome.replace(/[àáâãä]/g, 'a');
    str = str.replace(/[èéêë]/g, 'e');
    str = str.replace(/[ìíîï]/g, 'i');
    str = str.replace(/[òóôõö]/g, 'o');
    str = str.replace(/[ùúûü]/g, 'u');
    str = str.replace(/ñ/g, 'n');
    str = str.replace(/[ÀÁÂÃÄ]/g, 'A');
    str = str.replace(/[ÈÉÊË]/g, 'E');
    str = str.replace(/[ÌÍÎÏ]/g, 'I');
    str = str.replace(/[ÒÓÔÕÖ]/g, 'O');
    str = str.replace(/[ÙÚÛÜ]/g, 'U');
    str = str.replace(/Ñ/g, 'N');
    //como watson nao aceita sinonimos identicos, 
    //caso o nome sem acento continue igual, retorna false
    if (str == nome) return false;
    return str;
}

function removeHifen(nome) {
    if (!nome) return false;
    str = nome.replace(/-/g, ' ');
    //como watson nao aceita sinonimos identicos, 
    //caso o nome sem hifen continue igual, retorna false
    if (str == nome) return false;
    return str;
}

async function cidadesPorUF(uf) {
    var cidades = [];
    await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf + '/municipios') //API IBGE
        .then(function (res) {
            for (cidade of res.data) {
                cidades.push({
                    nome: cidade.nome,
                    nome_sem_acento: removeAcentos(cidade.nome),
                    nome_sem_hifen: removeHifen(cidade.nome),
                    nome_sem_acento_hifen: removeHifen(removeAcentos(cidade.nome))
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            exit();
        });
    return cidades;
}

async function saveToCSV(cidades, output, incluirUF) {
    try {
        var str = "";
        for (cidade of cidades) {
            let linha = "Cidades,"
            if (incluirUF) linha += incluirUF + ","; //a UF nao pode ser incluida no csv caso este seja utilizado diretamente no watson 
            linha += cidade.nome;
            if (cidade.nome_sem_acento) linha += "," + cidade.nome_sem_acento;
            if (cidade.nome_sem_hifen) linha += "," + cidade.nome_sem_hifen;
            if (cidade.nome_sem_acento_hifen) linha += "," + cidade.nome_sem_acento_hifen;
            str += linha + "\n";
        }
        await fs.writeFileSync(output, str);
        console.log("Arquivo " + output + " SALVO com sucesso!");
    } catch (error) {
        console.log(error);
        exit();
    }
}

async function gerarCSVCidades(uf, output, incluirUF = false) {
    cidadesPorUF(uf).then(async cidades => {
        //caso incluirUF seja true, inclui campo UF no csv (apenas se for utilizar o csv para salvar no bd)
        //a UF nao pode ser incluida no csv caso este seja utilizado diretamente no watson 
        incluirUF = incluirUF ? uf : false;
        await saveToCSV(cidades, output, incluirUF);
    })
        .catch(e => console.log(e));
}

// Exemplo de execução 1:
//gerar csv das cidades do RS para usar como entidade no watson
// gerarCSVCidades('RS', './cidadesRS.csv');

// Exemplo de execução 2:
//gerar csv de todas as cidades do Brasil incluindo campo UF, para usar para outros propositos (salvar em um bd)
// (async () => {
//     for (uf of ufs) {
//         await gerarCSVCidades(uf, './cidades' + uf + '.csv', true);
//     }
// })();