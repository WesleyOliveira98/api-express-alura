const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar () {
        const result = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = result.id
        this.dataCriacao = result.dataCriacao
        this.dataAtualizacao = result.dataAtualizacao
        this.versao = result.versao
    }

    async carregar () {
        const encontrado = await TabelaFornecedor.pegarPorId(this.id)
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }
}

module.exports = Fornecedor