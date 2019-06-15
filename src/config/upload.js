const multer = require('multer');
//Importando o path, do node, biblioteca do node para lidar com caminhos
const path = require('path');

//Exportando objeto com as configurações do multer
module.exports = {
    //Tipo de storage: diskStorage para salvar dentro do projeto
    storage: new multer.diskStorage({
        //Informando a pasta para salvar
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //Aqui passamos as configurações que o arquivo deve receber. Essa função vai receber o arquivo, a requisição e um callback  
        filename: function(req, file, cb){
            //Chamamos o callback quando a imagem é salva
            cb(null, file.originalname);
        }
    })
};