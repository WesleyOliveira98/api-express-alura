class CampoInvalido extends Error {
    constructor (field) {
        super(`O campo '${field}' está inválido!`)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido