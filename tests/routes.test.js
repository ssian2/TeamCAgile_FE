const request = require('supertest')
const app = require('../app')

describe('testing the home path', () => {
  it('should get 200 status code', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(200)
  })
})