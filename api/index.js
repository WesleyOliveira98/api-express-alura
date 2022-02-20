const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(bodyParser.json())

const router = require('./routes/fornecedores')
app.use('/api/fornecedores', router)

app.use((error, req, res, next) => {
    if (error instanceof NaoEncontrado) res.status(404)
        else res.status(400)
        res.send(JSON.stringify({ 
            erro: error.message, 
            id: error.idErro 
        }))
})

app.listen(config.get('api.port'), () => console.log('API is listen on port 3000...'))