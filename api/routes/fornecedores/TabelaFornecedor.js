const model = require('./table_model')

module.exports = {
    listar () {
        return model.findAll()
    }
}