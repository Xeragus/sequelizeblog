const request = require('supertest')
const app = require('../../app')

describe('GET /users/login', () => {
  it('should return login form', async done => {
      const res = await request(app).get('/users/login')
      expect(res.statusCode).toEqual(200)
      expect(res.redirects.length).toEqual(0)
      expect(res.type).toEqual('text/html')
      expect(res.text).toContain('<h5>Login</h5>')
      done()
  })
})

describe('GET /users/register', () => {
  it('should return register form', async done => {
      const res = await request(app).get('/users/register')
      expect(res.statusCode).toEqual(200)
      expect(res.redirects.length).toEqual(0)
      expect(res.type).toEqual('text/html')
      expect(res.text).toContain('<h5>Register</h5>')
      done()
  })
})