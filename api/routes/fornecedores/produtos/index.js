//Usa o mergeParams para herdar os parametros do roteador a um nivel superior
const router = require('express').Router({ mergeParams: true })
const TabelaProduto = require('./TabelaProduto')
const Produto = require('./Produto')

router.get('/', async (req, res) => {
    const produtos = await TabelaProduto.listar(req.params.idFornecedor)
    res.send(JSON.stringify(produtos))
})

router.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const body = req.body
        const dados = {...body,...{ fornecedor: idFornecedor }}
        const produto = new Produto(dados)
        await produto.criar()
        res.status(201)
        res.send(produto)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    const dados = {
        id: req.params.id,
        fornecedor: req.params.idFornecedor
    }
    const produto = new Produto(dados)
    await produto.apagar()
    res.status(204)
    res.end()
})

module.exports = router