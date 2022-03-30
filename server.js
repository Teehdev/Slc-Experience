const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const index = require('./routes/index');
const auth = require('./routes/auth');
const {exphbs, engine} = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore =  require ('connect-mongo');
const connectDB = require('./config/db');
const stories = require('./routes/stories')
 

//  Load config 
dotenv.config({path: './config/config.env'})

// passport config

require('./config/passport')(passport)

// connect database
connectDB()

const app = express()

// Body-parser
 app.use(express.urlencoded({ extended: false}))
 app.use(express.json())
// logging
if (process.env.NODE_ENV ==='development') {
    app.use(morgan('dev'))
}


// Handlebars

app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './view');

// session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
   
  })
  )

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// static folder
app.use(express.static(path.join(__dirname, 'public')))
// Routes
app.use('/', index )
app.use('/auth', auth )
app.use('/stories/add', stories)


const PORT = process.env.PORT || 5000

app.listen(PORT, 
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))