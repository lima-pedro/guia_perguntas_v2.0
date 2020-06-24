const Sequelize = require('sequelize')

const connection = new Sequelize ('guia_perguntas', 'root', 'So101190' ,{
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
})

connection
  .authenticate()
  .then( () => {
    console.log(`Conectado à base de dados com sucesso!`)
  })
  .catch( err => {
    console.log(`Erro ao conectar à base de dados ${err}`)
  })

module.exports = connection
