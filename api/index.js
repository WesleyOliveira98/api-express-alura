const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoRecebidos = require('./erros/DadosNaoRecebidos')

app.use(bodyParser.json())

const router = require('./routes/fornecedores')
app.use('/api/fornecedores', router)

app.use((error, req, res, next) => {
    let status = 500
    if (error instanceof NaoEncontrado) status = 404
    if (error instanceof CampoInvalido || error instanceof DadosNaoRecebidos) status = 400

    res.status(status)
    res.send(JSON.stringify({ 
        erro: error.message, 
        id: error.idErro 
    }))
})

app.listen(config.get('api.port'), () => console.log('API is listen on port 3000...'))