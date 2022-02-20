class NaoEncontrado extends Error {
    constructor () {
        super('Fornecedor não encontrado!')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado