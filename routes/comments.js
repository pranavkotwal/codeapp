const express = require('express')
const router = express.Router();
const passport = require('passport')
const commentsContrtoller = require('../controllers/comments_controller')

router.post('/create',passport.checkAuthentication,commentsContrtoller.create)

module.exports = router