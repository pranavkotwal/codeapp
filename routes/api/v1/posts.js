const express = require('express');
const passport = require('passport')

const router = express.Router()
const postsAPi = require("../../../controllers/api/v1/posts_api")


router.get('/',postsAPi.index)
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsAPi.destroy)

module.exports = router