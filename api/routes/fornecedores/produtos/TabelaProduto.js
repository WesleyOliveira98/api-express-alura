const Model = require('./table_model')
const instance = require('../../../db')
const NaoEncontrado = require('../../../erros/NaoEncontrado')

//DAO (Data Acess Object)
module.exports = {
    listar (idFornecedor) {
        return Model.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
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
    },
    async pegarPorId (idProduto, idFornecedor) {
        const encontrado = await Model.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })

        if (!encontrado) throw new NaoEncontrado('Produto')

        return encontrado
    },
    atualizar (dadosProduto, novosDados) {
        return Model.update(novosDados, {
            where: dadosProduto
        })
    },
    subtrair (idProduto, idFornecedor, campo, quantidade) {
        return instance.transaction(async transacao => {
            const produto = await Model.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })

            produto[campo] = quantidade

            await produto.save()

            return produto
        })
    }
}