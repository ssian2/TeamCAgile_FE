const request = require('supertest')
const app = require('../app')

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('safari')
    .build();

describe('testing the job role path', () => {
  it('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles/by-band')
    expect(res.statusCode).toEqual(200)
  })
})



