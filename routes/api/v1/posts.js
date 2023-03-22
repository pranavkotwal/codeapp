const express = require('express');

const router = express.Router()
const postsAPi = require("../../../controllers/api/v1/posts_api")


router.get('/',postsAPi.index)
router.delete('/:id',postsAPi.destroy)

module.exports = router