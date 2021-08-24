const request = require('supertest')
const app = require('../app')

describe('testing the job role path', () => {
  it('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles')
    expect(res.statusCode).toEqual(200)
  })
})

describe('testing the job spec path', () => {
  it('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles-spec')
    expect(res.statusCode).toEqual(200)
  })
})