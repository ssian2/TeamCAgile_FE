const request = require('supertest')
const app = require('../app.js')


const getElementXpath = async (driver, xpath, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};
 
 
const getElementName = async (driver, name, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};
 
const getElementId = async (driver, id, timeout = 3000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};


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
