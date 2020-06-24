const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./src/public'))
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(routes)

app.listen(3333, err => {
  if (err) {
    console.log(`Erro ao iniciar servidor ${err}`)
  } else {
    console.log(`Servidor rodando ... `)
  }
})