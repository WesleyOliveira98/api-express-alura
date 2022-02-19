const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')

router.use('/', async (req,res) => {
    const result = await TabelaFornecedor.listar()
    res.send(JSON.stringify(result))
})

module.exports = router