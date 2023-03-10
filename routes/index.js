const express = require('express');

const router = express.Router()
const homeController = require('../controllers/home_controller')

console.log(`router loaded`)
// From main index.js >> app.use('/') any requests that come from controllers 
// would go to route/index.js and when we use route.use('/users....) >> 
// it would redirect to user controllers


router.get('/',homeController.home)
//whenever the pattern of the path is for users it would be forwarded to users route
router.use('/users',require(`./users`))

// for any further routes, acces from here
// router.use('/routerName', require('./routerFile))
router.get('/posts',require(`./posts`))

module.exports = router
