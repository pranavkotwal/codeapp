const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const port = 8000;

app.use(expressLayouts)

// use express router 
app.use('/',require('./routes/index'))

//use static folder
app.use(express.static('./assets'))


// set the view engine to ejs
app.set('view engine','ejs')
app.set('views','./views')


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server ${err}`)

    }
    console.log(`Server is running on port : ${port}`)

})