const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.db)

const Comment = sequelize.define('comment', {
    book: Sequelize.INTEGER,
    user: Sequelize.INTEGER,
    comment: Sequelize.TEXT
},{
  timestamps: false
})


module.exports = Comment