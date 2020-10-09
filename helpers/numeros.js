module.exports = function formatarNumero(num){
    return num.toLocaleString('pt-BR').replace(/\,/g, '.'); //insere pontos de separacao no numero
}