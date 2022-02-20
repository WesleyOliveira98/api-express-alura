const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoRecebidos = require('./erros/DadosNaoRecebidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(bodyParser.json())

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

const router = require('./routes/fornecedores')
app.use('/api/fornecedores', router)

app.use((error, req, res, next) => {
    let status = 500
    if (error instanceof NaoEncontrado) status = 404
    if (error instanceof CampoInvalido || error instanceof DadosNaoRecebidos) status = 400
    if (error instanceof ValorNaoSuportado) status = 406

    res.status(status)
    res.send(JSON.stringify({ 
        erro: error.message, 
        id: error.idErro 
    }))
})

app.listen(config.get('api.port'), () => console.log('API is listen on port 3000...'))