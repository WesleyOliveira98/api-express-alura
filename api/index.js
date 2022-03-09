const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoRecebidos = require('./erros/DadosNaoRecebidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorError = require('./Serializador').SerializadorError

app.use(bodyParser.json())

//Middleware executado antes de todas as requisições
app.use((req, res, next) => {
    let formatoRequisicao = req.header('Accept')

    if(formatoRequisicao === '*/*') formatoRequisicao = 'application/json'

    if (formatosAceitos.indexOf(formatoRequisicao) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoRequisicao)
    next()
})

//Middleware para controlar o Acess-Control-Allow-Origin
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

//Rotas de Fornecedores
const router = require('./routes/fornecedores')
app.use('/api/fornecedores', router)

//Rotas de Fornecedores V2
const routerV2 = require('./routes/fornecedores/v2_routes')
app.use('/api/v2/fornecedores', routerV2)

//Middleware de erros
app.use((error, req, res, next) => {
    let status = 500
    if (error instanceof NaoEncontrado) status = 404
    if (error instanceof CampoInvalido || error instanceof DadosNaoRecebidos) status = 400
    if (error instanceof ValorNaoSuportado) status = 406

    const serializador = new SerializadorError(res.getHeader('Content-Type'))
    res.status(status)
    res.send(serializador.serializar({ 
        erro: error.message, 
        id: error.idErro 
    }))
})

app.listen(config.get('api.port'), () => console.log('API is listen on port 3000...'))