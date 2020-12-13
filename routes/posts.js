var express = require('express');
var router = express.Router();
const postsController = require('../controllers/posts');
const { ensureAuthenticated } = require('../config/auth');

router.get('/create', ensureAuthenticated, postsController.getCreate)
      .post('/', postsController.create);

module.exports = router;
