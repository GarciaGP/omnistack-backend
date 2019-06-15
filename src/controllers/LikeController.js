//Importando o modelo criado
const Post = require('../models/Post');

//Criaremos uma rota com um parâmetro para os likes, em rotas
module.exports = {
    //Método de "criação" de like
    async store(req, res) {
        //Para dar o like, primeiro buscamos o registro do post no banco de dados
        const post = await Post.findById(req.params.id);
        post.likes += 1;

        await post.save();

        //Emviando para o IO
        req.io.emit('like', post);

        return res.json(post);
    }

};