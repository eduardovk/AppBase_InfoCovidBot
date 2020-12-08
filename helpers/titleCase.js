module.exports = function toTitleCase(str) {
    var palavras = str.split(" ");
    var strFinal = "";
    for (var palavra of palavras) {
        if (palavra.length > 2 && palavra.toLowerCase() != "das" && palavra.toLowerCase() != "dos") {
            strFinal += palavra.charAt(0).toUpperCase() + palavra.slice(1) + " "
        } else {
            strFinal += palavra.toLowerCase() + " ";
        }
    }
    return strFinal.trim();
}