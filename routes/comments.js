const express = require('express')
const router = express.Router();
const passport = require('passport')
const commentsContrtoller = require('../controllers/comments_controller')

router.post('/create',passport.checkAuthentication,commentsContrtoller.create)
router.get('/destroy/:id', passport.checkAuthentication,commentsContrtoller.destroy)
module.exports = router