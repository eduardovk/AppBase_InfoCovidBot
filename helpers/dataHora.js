module.exports = function formatarDataHora(data) {
    var novaData = new Date(data);
    var dia = novaData.getDate().toString().padStart(2, '0');
    var mes = (novaData.getMonth() + 1).toString().padStart(2, '0');
    var ano = novaData.getFullYear();
    var hora = novaData.getHours();
    var min = novaData.getMinutes();
    return dia + "/" + mes + "/" + ano + "  " + hora + ":" + min;
}