var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');
const { ensureAuthenticated, redirectAuthenticated } = require('../config/auth')

// TODO: Group routes below under common middleware

router.get('/login', redirectAuthenticated, usersController.getLogin)
      .get('/register', redirectAuthenticated, usersController.getRegister)
      .post('/login', redirectAuthenticated, usersController.login)
      .post('/register', redirectAuthenticated, usersController.register)
      .get('/logout', ensureAuthenticated, usersController.logout);

module.exports = router;
