const model = require('./table_model')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () {
        return model.findAll({ raw: true })
    },
    inserir (fornecedor) {
        return model.create(fornecedor)
    },
    async pegarPorId (id) {
        const encontrado = await model.findOne({
            where: { id: id }
        })

        if (!encontrado) throw new NaoEncontrado('Fornecedor')
        
        return encontrado
    },
    async atualizar (id, object) {
        return model.update(object, {
            where: { id: id }
        })
    },
    async remover (id) {
        return model.destroy({
            where: { id: id }
        })
    }
}