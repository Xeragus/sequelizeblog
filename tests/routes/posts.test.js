const request = require('supertest')
const app = require('../../app')
const { Post, Category } = require('../../models')

describe('GET /', () => {
  it('should redirect to /users/login if user not authenticated', async done => {
      const res = await request(app).get('/')

      expect(res.statusCode).toEqual(302)
      expect(res.header.location).toEqual('/users/login')
      done()
  })
})

describe('POST /posts', () => {
  it('should redirect to /users/login if user not authenticated', async done => {
    const res = await request(app).get('/')

    expect(res.statusCode).toEqual(302)
    expect(res.header.location).toEqual('/users/login')
    done()
  })

  it('should create new post', async done => {
    const title = 'Test blog title';
    const content = 'Test blog content';
    const category = await Category.create({ name: 'test' })
    const res = await request(app).post('/posts').send({
      title: 'Test blog title',
      content: 'Test blog content',
      category_id: category.id
    })
    const posts = await Post.findAll({ raw: true })

    expect(posts[0].title).toEqual(title)
    expect(posts[0].content).toEqual(content)
    done()
  })
})

// To be continued...