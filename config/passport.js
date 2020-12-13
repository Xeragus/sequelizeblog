const LocalStrategy = require('passport-local').Strategy
const { User } = require("../models");
const bcrypt = require('bcrypt')

module.exports = (passport) => {
  const localStrategy = new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ where: { username: username } })
        .then(user => {
          if (!user) return done(null, false, { message: 'The username is not registered' })
          
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error

            if (isMatch) {
              return done(null, user, { user: user })
            } else {
              return done(null, false, { message: 'Password incorrect' })
            }
          })
        })
        .catch(error => {
          console.log('error during login', error)
        })
  })

  passport.use(localStrategy)

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then(user => {
          done(null, user);
        })
        .catch(err => {
          done(err, false);
        });
  })
}