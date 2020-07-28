const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.db)

const Rating = sequelize.define('rating', {
    book: Sequelize.INTEGER,
    user: Sequelize.INTEGER,
    rate: Sequelize.INTEGER
},{
  timestamps: false
})


module.exports = Rating