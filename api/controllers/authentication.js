const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')
var uniqid = require('uniqid')
const nodeMailer = require('nodemailer')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.signin = (req, res, next) => res.send({ 
  token: tokenForUser(req.user),
  id: req.user.id,
  name: req.user.name,
  avatar: req.user.avatar,
  mode: req.user.mode,
  language: req.user.language
})

exports.signup = (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const confKey = uniqid()
  const about = `Hello there! I'm ${name}`;

  if (!name || !email || !password) {
  	return res.status(422).send({error: "You must provide name, password and email"})
  }

  User.findOne({where: {email: email}}).then(existingUser => {
  	if (existingUser) {
  	  return res.status(422).send({error: 'Email is in use'})
  	}
    User.findOne({where: {name: name}}).then(u => {
      if (u) return res.status(422).send({error: 'Name is in use'})

    	User.create({name,email,password,confKey, about})
        .then(user => {

          // send the key for activation through email
          let transporter = nodeMailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  // should be replaced with real sender's account
                  user: config.email,
                  pass: config.emailPassword
              }
          });
          let mailOptions = {
              // should be replaced with real recipient's account
              to: email,
              subject: 'FicHub account activation.',
              html: `Please confirm your account <a href="${config.apiUrl}/verify?id=${user.id}&confKey=${confKey}">here</a>.`
          };
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
          });


          res.sendStatus(200)
        })
        .catch(e => next(err))
      })	
    })

}

exports.verify = (req, res, next) => {
  const id = req.query.id
  const confKey = req.query.confKey

  User.findOne({where: {id: id, confKey: confKey}}).then(existingUser => {
    if (existingUser) {
      if (!existingUser.confirmed) {
        existingUser.confirmed = 1
        existingUser.save().then(user => {
          //res.json({token: tokenForUser(user)})
          //res.cookie('cookieName',tokenForUser(user), { expires: false, httpOnly: true })
          //console.log('cookie created successfully')
          res.redirect(config.clientUrl + '/signin')
        })
      }
      else res.status(422).send({error: 'User already verified'})
    }
  })
}