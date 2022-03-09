const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const jsontoxml = require('jsontoxml')

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    xml (dados) {
        let tag = this.tagSingular

        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map(dado => {
                return { [this.tagSingular]: dado }
            })
        }
        return jsontoxml({ [tag]: dados })
    }

    serializar (dados) {
        dados = this.filtrar(dados)

        if (this.contentType === 'application/json') return this.json(dados)
        if (this.contentType === 'application/xml') return this.xml(dados)

        throw new ValorNaoSuportado(this.contentType)
    }

    filtrarObjeto (dados) {
        const newObject = {}

        this.publicFields.forEach(field => {
            if (dados.hasOwnProperty(field)) newObject[field] = dados[field]
        })

        return newObject
    }

    filtrar (dados) {
        if(Array.isArray(dados)) dados = dados.map(dado => { return this.filtrarObjeto(dado) })
        else this.filtrarObjeto(dados)

        return dados
    }

}

class SerializadorFornecedor extends Serializador {
    constructor (contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'categoria'].concat(extraFields || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

class SerializadorProduto extends Serializador {
    constructor (contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'titulo'].concat(extraFields || [])
        this.tagSingular = 'produto'
        this.tagPlural = 'produtos'
    }
}

class SerializadorError extends Serializador {
    constructor (contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'erro'].concat(extraFields || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorError: SerializadorError,
    SerializadorProduto: SerializadorProduto,
    formatosAceitos: ['application/json', 'application/xml']
}