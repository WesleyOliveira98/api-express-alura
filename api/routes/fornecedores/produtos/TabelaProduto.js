const Model = require('./table_model')

//DAO (Data Acess Object)
module.exports = {
    listar (idFornecedor) {
        return Model.findAll({
            where: {
                fornecedor: idFornecedor
            }
        })
    },
    inserir (dados) {
        return Model.create(dados)
    }
}