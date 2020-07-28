const Rating = require('../models/rating')
const Comment = require('../models/comment')
const Like = require('../models/like')
const Book = require('../models/book')
const Chapter = require('../models/chapter')
const jwt = require('jwt-simple')
const config = require('../config')

exports.rate = (req, res, next) => {
  const user = req.user.id
  const book = req.body.book
  const rate = req.body.rate

  Rating.findOrCreate({where: {user: user, book: book}}).then(() => {
    Rating.findOne({where: {user: user, book: book}}).then(rating => {
      rating.rate = rate
      rating.save().then(() => {
        Book.findOne({where: {id: book}}).then(b => {
          b.updateRating(bk => res.send(bk))
        })
      })
    })
  })
}

exports.like = (req, res, next) => {
  const user = req.user.id
  const book = req.body.book
  const chapter = req.body.chapter

  Chapter.findOne({where: {book: book, no: chapter}}).then(c => {
    Like.findOne({where: {user: user, book: book, chapter: chapter}}).then(like => {
      if (like) like.destroy().then(() => c.updateLikes(ch => res.send(ch)))
      else Like.create({book, chapter, user}).then(() => c.updateLikes(ch => res.send(ch)))
    })
  })
}

exports.comment = (req, res, next) => {
  const user = req.user.id
  const book = req.body.book
  const comment = req.body.comment

  Comment.create({book, user, comment}).then(() => res.sendStatus(200))
}



