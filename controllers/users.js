const { User } = require("../models");
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = {
  getLogin: (req, res) => {
    res.render('auth/login');
  },
  getRegister: (req, res) => {
    res.render('auth/register');
  },
  login: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next)
  },
  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ where: { username: username } });

      if (user) throw new Error('Email is already registered');

      user = new User({ username, password });

      bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;

        bcrypt.hash(user.password, salt, async (error, hash) => {
          if (error) throw error;

          user.password = hash;
          await user.save();
          req.flash('success_message', 'You are now registered. Please log in.');
          res.redirect('/users/login');
        })
      })
    } catch (err) {
      res.render('auth/register', { ...req.body, error: err.message });
    }
  },
  logout: (req, res) => {
    req.logout();
    req.flash('success_message', 'You are logged out');
    res.redirect('/users/login');
  }
}