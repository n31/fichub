const Authentication = require('./controllers/authentication')
const UserUpdate = require('./controllers/userUpdate')
const BookManage = require('./controllers/bookManage')
const ChapterManage = require('./controllers/chapterManage')
const UserFeedback = require('./controllers/userFeedback')
const passportStrategies = require('./services/passport')
const passport = require('passport')

passport.use(passportStrategies.jwt)
passport.use(passportStrategies.local)

const requireAuth = passport.authenticate('jwt', { session : false })
const requireSignin = passport.authenticate('local', { session : false })

module.exports = (app) => {
  
  app.get('/', requireAuth, (req, res) => res.send({hi: 'there'}))
  app.post('/userUpdate', requireAuth, UserUpdate.update)

  app.post('/createBook', requireAuth, BookManage.create)
  app.post('/updateBook', requireAuth, BookManage.update)
  app.get('/getBook', BookManage.find)
  app.get('/getBookComments', BookManage.comments)
  app.get('/showBooks', BookManage.show)

  app.post('/createChapter', requireAuth, ChapterManage.create)
  app.post('/updateChapter', requireAuth, ChapterManage.update)
  app.get('/getChapter', ChapterManage.find)
  app.get('/showChapters', ChapterManage.show)

  app.post('/rate', requireAuth, UserFeedback.rate)
  app.post('/like', requireAuth, UserFeedback.like)
  app.post('/comment', requireAuth, UserFeedback.comment)

  app.post('/signup', Authentication.signup)
  app.post('/signin', requireSignin, Authentication.signin)
  app.get('/health', (req, res) => res.send('I\'m aliveeee !'))
  app.get('/verify', Authentication.verify)

  app.post('/sms', (req, res) => {
    const run = smsParser(req.body.message)
    console.log('id: ', run.id)
    console.log('time: ', run.time)
    res.status(200).send({events: []})
  })
}