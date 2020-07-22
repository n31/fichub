const User = require('../models/user')
const jwt = require('jwt-simple')
//const config = require('../config')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, 'secret shhh...'/*config.secret*/)
}

exports.signin = (req, res, next) => res.send({ token: tokenForUser(req.user) })

exports.signup = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const status = 1
  const regDate = Date.now()
  const lastLog = regDate

  if (!name || !email || !password) {
  	return res.status(422).send({error: "You must provide name, password and email"})
  }

  User.findOne({where: {email: email}}).then(existingUser => {
  	if (existingUser) {
  	  return res.status(422).send({error: 'Email is in use'})
  	}
    User.findOne({where: {name: name}}).then(u => {
      if (u) return res.status(422).send({error: 'Name is in use'})

    	User.create({name,email,password, regDate, lastLog, status})
        .then(user => res.json({token: tokenForUser(user)}))
        .catch(e => next(err))
      })	
    })

}