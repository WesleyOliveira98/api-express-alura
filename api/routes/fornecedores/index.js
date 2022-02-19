const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/', async (req,res) => {
    const result = await TabelaFornecedor.listar()
    res.send(JSON.stringify(result))
})

router.post('/', async (req,res) => {
    const body = req.body
    console.log(body)
    const fornecedor = new Fornecedor(body)
    await fornecedor.criar()
    res.send(JSON.stringify(fornecedor))
})

module.exports = router