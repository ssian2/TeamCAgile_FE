const request = require('supertest')
const app = require('../app.js')

describe('testing the job role path', () => {
  it('should get 200 status code', async () => {
    const res = await request(app)
    .get('/job-roles')
    expect(res.statusCode).toEqual(200)
  })
});

describe('testing the job spec path', () => {
  it('should get 200 status code', async () => {
    const res = await request(app)
    .get('/capabilities/job-family')
    expect(res.statusCode).toEqual(200)
  })
});

afterAll(async () => { console.log('closing...'); await app.close(); });
