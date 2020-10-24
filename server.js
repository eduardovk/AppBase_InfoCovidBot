const http = require('http'); //importa biblioteca http
const routes = require('./routes'); //importa rotas
const port = process.env.PORT || 3000  //define porta padrao

const server = http.createServer(routes); //cria server com o routes.js

server.listen(port); //inicia o server ouvindo a porta padrao