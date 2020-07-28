const Book = require('../models/book')
const User = require('../models/user')
const Chapter = require('../models/chapter')
const jwt = require('jwt-simple')
const config = require('../config')

exports.create = (req, res, next) => {
  const id = req.user.id
  const book = req.body.book
  let no
  const name = req.body.name
  const story = req.body.story
  const image = req.body.image

  User.findOne({where: {id: id}}).then(user => {
    const username = user.name
    Book.findOne({where: {id: book, user: username}}).then(b => {
      if (!b) {
        res.status(400).send("error: invalid request")
        return
      }
      Chapter.findAll({where: {book: b.id}, order: [ ['no',  'ASC'] ]}).then(chapters => {
        if (!chapters.length) no = 0
        else {
          no = chapters[chapters.length-1].no + 1
        }

        //console.log(chapters.length);
        Chapter.create({book,no,name,story,image})
          .then(chapter => res.send({
            book: chapter.book,
            no: chapter.no
          }))
      })
    })
  })
}

exports.update = (req, res, next) => {
  const id = req.user.id
  const book = req.body.book
  const no = req.body.no
  const newNo = req.body.newNo || null
  const name = req.body.name || null
  const story = req.body.story || null
  const image = req.body.image || null

  User.findOne({where: {id: id}}).then(user => {
    const username = user.name
    Book.findOne({where: {id: book, user: username}}).then(b => {
      if (!b) {
        res.status(400).send("error: invalid request")
        return
      }
      Chapter.findOne({where: {book: book, no: no}}).then(chapter => {
        if (!chapter) {
          res.status(400).send("error: invalid request")
          return
        }
        if (newNo) chapter.no = newNo
        if (name) chapter.name = name
        if (story) chapter.story = story
        if (image) chapter.image = image

        chapter.save().then(c => res.sendStatus(200))
      })
    })
  })


}

exports.find = (req, res, next) => {
  if (!req.query.book || !req.query.no) {
    res.status(400).send("error: invalid request")
    return
  }
  const book = req.query.book
  const no = req.query.no

  Chapter.findOne({where: {book: book, no: no}}).then(chapter => {
    if (chapter) res.send({
      name: chapter.name,
      story: chapter.story,
      image: chapter.image,
      likes: chapter.likes
    })
    else res.status(404).send("error: not found")
  })
}

exports.show = (req, res, next) => {
  if (!req.query.book) {
    res.status(400).send("error: invalid request")
    return
  }
  const book = req.query.book

  Chapter.findAll({where: {book: book}, order: [ ['no',  'ASC'] ]}).then(chapters => res.send(chapters))
}