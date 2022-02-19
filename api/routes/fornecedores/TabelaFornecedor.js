const model = require('./table_model')

module.exports = {
    listar () {
        return model.findAll()
    },
    inserir (fornecedor) {
        return model.create(fornecedor)
    },
    async pegarPorId (id) {
        const encontrado = await model.findOne({
            where: { id: id }
        })

        if (!encontrado) throw new Error('Fornecedor não encontrado')
        
        return encontrado
    }
}