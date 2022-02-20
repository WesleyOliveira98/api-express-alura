class DadosNaoRecebidos extends Error {
    constructor () {
        super('Não foram recebidos dados para atualizar!')
        this.name = 'DadosNaoRecebidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoRecebidos