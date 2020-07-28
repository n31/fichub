const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

exports.update = (req, res, next) => {
  const id = req.user.id
  const avatar = req.body.avatar || null
  const language = req.body.language || null
  const mode = req.body.mode || null
  const about = req.body.about || null

  User.findOne({where: {id: id}}).then(user => {
      if (avatar) user.avatar = avatar
      if (language) user.language = language
      if (mode) user.mode = mode
      if (about) user.about = about
      user.save().then(u => res.send({
        avatar: u.avatar,
        language: u.language,
        mode: u.mode
      }))
    }
  )
}