//Importando o modelo criado
const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');


//Exportando o objeto com métodos do controller (Para o método get)
module.exports = {
    async index(req, res) {
        //Buscando os posts pela ordem decrescente de criação
        const posts = await Post.find().sort('-createdAt');
        //Retorna os posts descrescentes
        return res.json(posts);
    },

    //Função de cadastrar post
    async store(req, res) {
        //Configurando que deve receber os atributos do model
        //Puxando as strins para o req.body
        const { author, place, description, hashtags } = req.body
        //Buscando o filename para a req.file com o nome image
        const { filename: image } = req.file;

        //Para salvar a imagem sempre como jpeg, separamos o nome da extensao
        const [name] = image.split('.')
        const fileName = `${name}.jpg`;

        //Redimensionando a imagem antes de ela ser criada e salva
        //Buscamos o caminho original que é salvo
        //Para saber essas informações da imagem: return res.json(req.file)
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        //Apagamos a imagem original da nossa pasta
        fs.unlinkSync(req.file.path);

        //Informando a variável post deve criar um objeto do Model Post, com seus atributos(com delay)
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        //Emviando para o IO
        req.io.emit('post', post);
        
        //Retornamos em forma de JSON a rota /posts
        //Retornando o conteúdo da variável post
        return res.json(post);
    }

};