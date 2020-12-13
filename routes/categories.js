var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categories');
const { ensureAuthenticated } = require('../config/auth');

router.use('/', [ensureAuthenticated]);

router.get('/', categoriesController.getCategories)
      .get('/create', categoriesController.getCreate)
      .get('/:id', categoriesController.getPosts)
      .post('/', categoriesController.create);

module.exports = router;
