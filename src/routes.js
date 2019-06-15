//Teste multer
const multer = require('multer');
//Teste de envio de imagem para a pasta, importando a configuração:
const uploadConfig = require('./config/upload');
//Importar express
const express = require('express');
// Criando variável de rotas
const routes = new express.Router;

//Importanto controller
const PostController = require('./controllers/PostController');
//Importando o controller de like
const LikeController = require('./controllers/LikeController');

//Passando o multer e o parâmetro para salvar
const upload = multer(uploadConfig);
//Criando uma rota para o usuário       

//Rota para buscar as informações dos posts
routes.get('/posts', PostController.index);    
//Rota para enviar informações, chamando o método store de PostController
routes.post('/posts', upload.single('image'), PostController.store);    

//Rota de likes, com o parâmetro que recebe o ID do post
routes.post('/posts/:id/like', LikeController.store);    


//Importando rotas
module.exports = routes;

