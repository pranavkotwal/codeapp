const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const port = 8000;
const db = require('./config/mongoose')
//authentication cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-stratergy')
const MongoStore = require('connect-mongo')

// sass
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(expressLayouts)
//extract style and scripts from sub pages into the layout

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)



//use static folder
app.use(express.static('./assets'))


// set the view engine to ejs
app.set('view engine','ejs')
app.set('views','./views')

// Mongo store is used to store the session cookie in the db
app.use(session({
    name:"codeapp",
    //TODO change the secret before deployment in production mode
    secret: 'something',
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:  MongoStore.create({
        mongoUrl : 'mongodb://localhost/codeapp_development',
        autoRemove:'disabled'
    },function(err){
        console.log(err || "connect-mongobd setup")
    })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

// use express router 
app.use('/',require('./routes/index'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err}`)

    }
    console.log(`Server is running on port : ${port}`)

})