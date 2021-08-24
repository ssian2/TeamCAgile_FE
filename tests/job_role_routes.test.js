const request = require('supertest')
const app = require('../app')

describe('testing the job role path', () => {
  it('should get test role name as first result', async () => {
    const res = await request(app)
      .get('/job-roles/by-band')
      console.log(res.body)
    expect(res.body.role.name).toEqual("test role")
  })
})

