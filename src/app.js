const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const helmet = require('helmet')
const cors = require('cors')


const mongoose = require('mongoose')
const middlewares = require('./middlewares/index').middleware
const routes = require('./routes')



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => console.log("DB Connected"))



// setup
const app = express()
// app.set('views',path.join(__dirname,'views'))
// app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(helmet())

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// routes/middlewares
app.get('/', (req, res) => {
  const homepage = { 
    "routes": ['/users']
  }
  // res.render('pages/home',homepage)
  res.json(homepage)
})
app.use('/', routes)
app.use(middlewares)



module.exports = app