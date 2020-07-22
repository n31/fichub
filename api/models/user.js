const bcrypt = require('bcrypt-nodejs')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://bc95ef36a6368d:ed521b8d@eu-cdbr-west-03.cleardb.net/heroku_320ea454d13588a');

const User = sequelize.define('user', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    regDate: Sequelize.DATE,
    lastLog: Sequelize.DATE,
    status: Sequelize.INTEGER
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