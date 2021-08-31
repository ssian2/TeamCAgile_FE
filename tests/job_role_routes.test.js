const request = require('supertest')
const app = require('../app.js')
jest.setTimeout(15000)


describe('Testing the job role path', () => {
  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles')
    expect(res.statusCode).toEqual(200)
    console.log(res.statusCode);
  })
  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/capabilities/job-family')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/capabilities/')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/capabilities/get/Cyber%20Security')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles-spec/2')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code on competencies page', async () => {
    const res = await request(app)
      .get('/bands-training/bands-competencies')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code on competencies page', async () => {
    const res = await request(app)
      .get('/bands-training/bands-competencies')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code on trainings page', async () => {
    const res = await request(app)
      .get('/bands-training')
    expect(res.statusCode).toEqual(200)
  })

  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles/by-band')
    expect(res.statusCode).toEqual(200)
  });
});

afterAll(async () => {
  console.log('closing...');
  await app.close();
});