const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')

const router = require('./router')

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))

router(app)

app.listen(config.port,/* config.host, */() => console.log('Listening....'))
