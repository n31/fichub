const Like = require('./like')
const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.db)

const Chapter = sequelize.define('chapter', {
    book: Sequelize.INTEGER,
    no: Sequelize.INTEGER,
    name: Sequelize.TEXT,
    story: Sequelize.TEXT,
    image: Sequelize.TEXT,
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
},{
  timestamps: false
})

Chapter.prototype.updateLikes = function (callback) {
  Like.findAll({where: {book: this.book, chapter: this.no}}).then(likes => {
    this.likes = likes.length
    this.save().then(callback(this))
  })
}

module.exports = Chapter