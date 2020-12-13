const { Category, Post } = require("../models");

module.exports = {
  getCategories: (req, res) => {
    Category.findAll({ raw : true })
            .then(categories => {
              res.render('categories/index', { categories });
            })
            .catch(err => {
              console.log('error on categories fetch:', err)
            })
  },
  getCreate: (req, res) => {
    res.render('categories/create')
  },
  getPosts: (req, res) => {
    Category.findByPk(req.params.id, { include: ['posts'] })
            .then(category => {
              // Explanation needed for the sorcery below
              const posts = category.posts.map(post => {
                return { ...post.get(), category: category.get()}
              })
              res.render('index', { posts: posts })
            })
            .catch(err => {
              console.log('error on posts by category fetch:', err)
            })
  },
  create: (req, res) => {
    Category.create(req.body)
            .then(category => {
              req.flash('success_message', 'Category successfully created.')
              res.redirect('/categories')
            })
            .catch(err => {
              console.log('error on posts by category fetch:', err)
            })
  }
}