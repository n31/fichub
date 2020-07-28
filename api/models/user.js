const bcrypt = require('bcrypt-nodejs')
const Sequelize = require('sequelize')
const config = require('../config')
const sequelize = new Sequelize(config.db)

const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    confirmed: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    confKey: Sequelize.TEXT,
    admin: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    avatar: {
      type: Sequelize.TEXT,
      defaultValue: config.defaultAvatar
    },
    language: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    mode: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    about: Sequelize.TEXT
},{
  timestamps: false,
  hooks: {
  	beforeCreate: (user, options) => {
  	  return new Promise((resolve, reject) => {
	    bcrypt.genSalt(10, (err, salt) => {
	      if (err) { reject(err) }

	      return bcrypt.hash(user.password, salt, null, (err, hash) => {
	        if (err) { reject(err) }
	          user.password = hash
	          resolve()
	      })
	    })
	  })
  	}
  }
})

User.prototype.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err)

    callback(null, isMatch)
  })
}

module.exports = User