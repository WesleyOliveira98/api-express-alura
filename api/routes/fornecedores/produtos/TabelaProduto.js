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
    },
    remover (idProduto, idFornecedor) {
        return Model.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }
}