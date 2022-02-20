const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    json (dados) {
        return JSON.stringify(dados)
    }

    serializar (dados) {
        if (this.contentType === 'application/json') {
            return this.json(this.filtrar(dados))
        }

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
    constructor (contentType) {
        super()
        this.contentType = contentType
        this.publicFields = ['id', 'empresa', 'categoria']
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
}