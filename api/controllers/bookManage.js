const Book = require('../models/book')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jwt-simple')
const config = require('../config')

exports.create = (req, res, next) => {
  const id = req.user.id
  const name = req.body.name
  const about = req.body.about
  const genre = req.body.genre
  const tags = req.body.tags
  const upd = Date.now()

  User.findOne({where: {id: id}}).then(u => {
    const user = u.name

    Book.create({user,name,about,genre,tags,upd})
      .then(book => res.send({
        user: book.user,
        id: book.id
      }))
  })
}

exports.update = (req, res, next) => {
  const id = req.user.id
  const bookId = req.body.id
  const name = req.body.name
  const about = req.body.about
  const genre = req.body.genre
  const tags = req.body.tags
  const upd = Date.now()

  User.findOne({where: {id: id}}).then(u => {
    const user = u.name

    Book.findOne({where: {user: user, id: bookId}}).then(book => {
      book.name = name
      book.about = about
      book.genre = genre
      book.tags = tags
      book.upd = upd
      book.save().then(b => res.send({
        user: book.user,
        id: book.id
      }))
    })
  })
}

exports.find = (req, res, next) => {
  const id = req.query.id

  Book.findOne({where: {id: id}}).then(book => res.send({
    user: book.user,
    name: book.name,
    about: book.about,
    genre: book.genre,
    tags: book.tags,
    upd: book.upd,
    rating: book.rating
  }))
}

exports.show = (req, res, next) => {
  const s = req.query.s
  let order
  if (s == 'latest')  order = 'upd'
  else if (s == 'rating') order = 'rating'
  else {
    res.status(400).send({error: 'invalid request'})
    return
  }
  Book.findAll({ order: [ [order,  'DESC'] ]}).then(books => res.send(books))
}

exports.comments = (req, res, next) => {
  const book = req.query.id
  
  //Comment.findAll({where: {book: book}}).then(comments => res.send(comments))
  
  Comment.findAll({where: {book: book}}).then(comments => {
    let result = Array()
    let itemsProcessed = 0
    comments.forEach(async e => {
      const userData = await getFullUserData(e.user)
      let merged = {...e.dataValues, ...userData}
      result.push(merged)
      itemsProcessed++
      if (itemsProcessed == comments.length) res.send(result)
    })
  })
}

async function getFullUserData(id) {
  let user = await User.findOne({where: {id: id}})
  return {name: user.name,avatar: user.avatar}
}