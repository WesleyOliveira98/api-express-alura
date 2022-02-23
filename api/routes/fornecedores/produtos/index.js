//Usa o mergeParams para herdar os parametros do roteador a um nivel superior
const router = require('express').Router({ mergeParams: true })
const TabelaProduto = require('./TabelaProduto')

router.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.params.idFornecedor)
    res.send(JSON.stringify(produtos))
})

module.exports = router