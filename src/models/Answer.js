const Sequelize = require('sequelize')
const connection = require('../database/connection')

const Answer = connection.define('answers', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// Answer.sync({ force:false }).then(() => {})

module.exports = Answer