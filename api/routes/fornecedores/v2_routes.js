const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(204)
    res.end()
})

router.get('/', async (req, res) => {
    const result = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
    res.send(serializador.serializar(result))
})

module.exports = router