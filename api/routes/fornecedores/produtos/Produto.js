const TabelaProduto = require('./TabelaProduto')
const DadosNaoRecebidos = require('../../../erros/DadosNaoRecebidos')
const CampoInvalido = require('../../../erros/CampoInvalido')

class Produto {
    constructor ({ id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    validar () {
        if (typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new CampoInvalido('titulo')
        }

        if (typeof this.preco !== 'number' || this.preco === 0) {
            throw new CampoInvalido('preco')
        }

        if (typeof this.estoque !== 'number' || this.estoque.length === 0) {
            throw new CampoInvalido('estoque')
        }
    }

    async criar () {
        this.validar()
        const resultado = await TabelaProduto.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    apagar () {
        return TabelaProduto.remover(this.id, this.fornecedor)
    }

    async carregar () {
        const produto = await TabelaProduto.pegarPorId(this.id, this.fornecedor)
        this.titulo = produto.titulo
        this.preco = produto.preco
        this.estoque = produto.estoque
        this.dataCriacao = produto.dataCriacao
        this.dataAtualizacao = produto.dataAtualizacao
        this.versao = produto.versao
    }

    atualizar() {
        const newObject = {}

        if (typeof this.titulo === 'string') {
            newObject.titulo = this.titulo
        }

        if (typeof this.preco === 'number' && this.preco !== 0) {
            newObject.preco = this.preco
        }

        if (typeof this.estoque === 'number') {
            newObject.estoque = this.estoque
        }

        if (Object.keys(newObject).length === 0){
            throw new DadosNaoRecebidos()
        }

        return TabelaProduto.atualizar({ id: this.id, fornecedor: this.fornecedor}, newObject)
    }

    diminuirEstoque () {
        return TabelaProduto.subtrair(
            this.id, 
            this.fornecedor,
            'estoque',
            this.estoque
        )
    }
}

module.exports = Produto