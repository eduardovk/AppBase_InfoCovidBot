const http = require('http'); //importa biblioteca http
const app = require('./app'); //importa app criado
const port = process.env.PORT || 3000  //define porta padrao


const server = http.createServer(app); //cria server com o app.js



server.listen(port); //inicia o server ouvindo a porta padrao