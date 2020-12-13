const { Post, Category }  = require('../models')

module.exports = {
  getPosts: (req, res) => {
    Post.findAll({ include: 'category' })
        .then(posts => {
          res.render('index', { posts });
        })
        .catch(err => {
          console.log('error on get create:', err)
        })
  },
  getCreate: (req, res) => {
    Category.findAll({ raw : true })
            .then(categories => {
              res.render('posts/create', { categories })
            })
            .catch(err => {
              console.log('error on get create:', err)
            })
  },
  create: (req, res) => {
    Post.create(req.body)
        .then(post => {
          req.flash('success_message', 'Post successfully created.')
          res.redirect('/')
        })
        .catch(err => {
          console.log('error on get create:', err)
        })
  }
}