const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

router.get('/', async (req,res) => {
    const result = await TabelaFornecedor.listar()
    res.status(200)
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
    res.send(serializador.serializar(result))
})

router.post('/', async (req, res, next) => {
    try {
        const body = req.body
        console.log(body)
        const fornecedor = new Fornecedor(body)
        await fornecedor.criar()
        res.status(201)
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'))
        res.send(serializador.serializar(fornecedor))
    } catch (error) { 
        next(error)
    }
    
})

router.get('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        res.status(200)
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'), 
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.send(serializador.serializar(fornecedor))
    } catch (error) { 
        next(error)
    }
})

router.put('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const body = req.body
        const dados = {...body,...{id: id}}
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.status(204)
        res.end() 
    } catch (error) { 
        next(error)
    }
})

router.delete('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        res.status(204)
        res.end() 
    } catch (error) { 
        next(error)
    }
})

module.exports = router