const Rating = require('./rating')
const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.db)

const Book = sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user: Sequelize.TEXT,
    name: Sequelize.TEXT,
    about: Sequelize.TEXT,
    genre: Sequelize.INTEGER,
    tags: Sequelize.TEXT,
    upd: Sequelize.DATE,
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
},{
  timestamps: false
})

Book.prototype.updateRating = function (callback) {
  Rating.findAll({attributes: ['rate'], where: {book: this.id}}).then(rating => {
    const sum = rating.reduce((a, b) => a + b.rate, 0)
    this.rating = sum / rating.length
    this.save().then(callback(this))
  })
}

module.exports = Book