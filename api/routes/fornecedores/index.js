const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/', async (req,res) => {
    const result = await TabelaFornecedor.listar()
    res.status(200)
    res.send(JSON.stringify(result))
})

router.post('/', async (req,res) => {
    try {
        const body = req.body
        console.log(body)
        const fornecedor = new Fornecedor(body)
        await fornecedor.criar()
        res.status(201)
        res.send(JSON.stringify(fornecedor))
    } catch (error) { 
        res.status(400)
        res.send(JSON.stringify({ erro: error.message })) 
    }
    
})

router.get('/:idFornecedor', async (req,res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200)
        res.send(JSON.stringify(fornecedor))
    } catch (error) { 
        res.status(404)
        res.send(JSON.stringify({ erro: error.message })) 
    }
})

router.put('/:idFornecedor', async (req,res) => {
    try {
        const id = req.params.idFornecedor
        const body = req.body
        const dados = {...body,...{id: id}}
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end() 
    } catch (error) { 
        res.status(400)
        res.send(JSON.stringify({ erro: error.message })) 
    }
})

router.delete('/:idFornecedor', async (req,res) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end() 
    } catch (error) { 
        res.status(404)
        res.send(JSON.stringify({ erro: error.message })) 
    }
})

module.exports = router