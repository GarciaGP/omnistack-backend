//Criando a classe de Posts
//Importar o MONGODB
const mongoose = require('mongoose');

//Aqui estamos criando a primeira classe para a tabela Post no MongoDB. Schemas são as tabelas no banco Mongo
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    //Na classe, as imagens também são strings. O caminho das imagens ficará salvo no nosso repositório.
    image: String,
    //Os likes serão um objeto
    likes: {
        type: Number,
        default: 0,
    }
    //Passando outro parâmetro para o schema:
}, {
        timestamps: true,
    });
//Exportando o modelo e dando o nome Post a ele
module.exports = mongoose.model('Post', PostSchema);
