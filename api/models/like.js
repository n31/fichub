const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.db)

const Like = sequelize.define('like', {
    book: Sequelize.INTEGER,
    chapter: Sequelize.INTEGER,
    user: Sequelize.INTEGER
},{
  timestamps: false
})


module.exports = Like