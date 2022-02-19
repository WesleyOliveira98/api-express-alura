const TableModel = require('../routes/fornecedores/table_model')

TableModel
    .sync()
    .then(() => console.log('Success in create table'))
    .catch(console.log)
