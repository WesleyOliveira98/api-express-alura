const models = [ 
    require('../routes/fornecedores/table_model'),
    require('../routes/fornecedores/produtos/table_model')
]

async function createTables () {
    for (let i=0; i<models.length; i++){
        await models[i].sync()
    }
}

createTables()
