var express = require('express');
var router = express.Router();
const postsController = require('../controllers/posts');
// const { ensureAuthenticated } = require('../config/auth')
const auth = require('../config/auth')

router.get('/', auth.ensureAuthenticated, postsController.getPosts);

module.exports = router;
