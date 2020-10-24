const pais = require('../services/pais');

module.exports = {
    casosConfirmadosBrasil: () =>{
            let service = new pais();
            let casos = await service.casosConfirmadosBrasil
            return casos.error ? false : casos;
    }
}

/* EXEMPLO CASO TENHA PARAMETROS (ESTADO) 
casosConfirmados: (params) =>{
    if(params.casos && params.casos.lenght > 0){
        let service = new pais();
        let casos = await service.casosConfirmados
    }
}
*/