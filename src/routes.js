const express = require('express')
const routes = express.Router()

const Question = require('./models/Question')
const Answer = require('./models/Answer')

// PERGUNTAS

routes.get('/makequestion', (request, response) => {
  response.render('question')
})

routes.get('/editquestion/:id', async (request, response) => {
  const id = request.params.id
  
  try {
    const question = await Question.findOne({ where: { id:id } })
    
    response.render('edit', { question })
  } catch (err) {
    response.redirect(`/editquestion/${id}`)
  }
})

routes.get('/questions', async (request, response) => {
  let erro = false
  
  try{
    const questions = await Question.findAll({ 
      raw: true, 
      order: [['id', 'DESC']]
    })
    response.render('index', { questions, erro})
    
  } catch (err) {
    erro = true
    response.render('index', { questions, erro})
  } 
  
})

routes.post('/questions/edit/:id', async (request, response) => {
  const id = request.params.id
  const { title, description } = request.body
  
  try{
    await Question.update({
      title,
      description
    }, {
      where: { id:id }
    })
    
    response.redirect('/questions')
    
  } catch (err) {
    response.redirect(`/editquestion/${id}`)
  }
})

routes.post('/questions', async (request, response) => {
  const { title, description } = request.body
  
  try {
    const { id } = await Question.create({
      title,
      description
    })
    
    if (id) {
      response.redirect('/questions')
    }
  } catch (err) {
    response.render('/questions')
  }
})

routes.get('/questions/delete/:id', async (request, response) => {
  const id = request.params.id
  
  try {
    await Question.destroy({ where: { id:id } })
    response.redirect('/questions')
  } catch (err) {
    response.redirect('/questions')
  }
})

// RESPOSTAS

routes.get('/answer/:id', async (request, response) => {
  const id = request.params.id
  
  try {
    const question = await Question.findOne({
      where: { id:id },
      raw: true
    })

    if (question) {
      let answers = await Answer.findAll({
        raw:true,
        where: { questionId: id },
        order: [['id', 'DESC']]
      })

      // console.log(answers)

      // if (answers) {
      //   console.log('entrou aqui ... ')
      
      //   return response.render('answer', { question, answers })
      // }  

      // answers = [{ description: "Nenhuma resposta para essa pergunta, seja o primeiro a responder!"}]
      return response.render('answer', { question, answers })
    }

  } catch (err) {
    return response.redirect('/questions')
  }
})

routes.post('/answer/:id', async (request, response) => {
  const questionId = request.params.id
  const { description } = request.body
  
  try {
    const id = await Answer.create({
      description,
      questionId
    })
    
    if (id) {
      response.redirect('/questions')
    } else {
      response.redirect(`/answer/question/${questionId}`)
    }
    
  } catch (err) {
    response.redirect(`/answer/question/${questionId}`)
  }
})

module.exports = routes
