const request = require('supertest')
const app = require('../../app')
const { Category } = require('../../models')

describe('GET /categories', () => {
  it('should redirect to /users/login if user not authenticated', async done => {
      const res = await request(app).get('/categories')

      expect(res.statusCode).toEqual(302)
      expect(res.header.location).toEqual('/users/login')
      done()
  })
})

describe('POST /categories', () => {
  it('should redirect to /users/login if user not authenticated', async done => {
    const res = await request(app).post('/categories').send({ name: 'test' })

    expect(res.statusCode).toEqual(302)
    expect(res.header.location).toEqual('/users/login')
    done()
  })

  it('should create new category', async done => {
    const name = 'test'
    const res = await request(app).post('/categories').send({ name: name })
    const categories = await Category.findAll({ raw: true })

    expect(categories[0].name).toEqual(name)
    done()
  })
})

// To be continued...