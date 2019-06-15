//Importamos a dependência express
//A variável express possui tudo o que podemos utilizar da dependência
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
//Criar aplicação
//Chamar a função express para a aplicação cria um servidor para ser acessado pelo navegador
const app = express();

//Configurando o node para ouvir requisições http:
const server = require('http').Server(app);

//Para ouvir requisições websocket:
const io = require('socket.io')(server);

//Conexão com o banco
mongoose.connect('mongodb+srv://admin:admin@cluster0-twmrg.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

//Disponibilizando a variável IO para todos os controllers:
app.use((req, res, next) => {
    req.io = io;
    next();
}) //Depois de configurado o io para todas as requisições, terminamos de configurar no post controller


//Rota para o cors, que permite a nossa 
app.use(cors());
//Rota para o front end acessar as imagens
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//Informando para aplicação utilizar as rotas do arquivo routes.js
app.use(require('./routes'));

//Informando a porta que a nossa aplicação irá utilizar
server.listen(8085);