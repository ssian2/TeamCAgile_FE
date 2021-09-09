const request = require('supertest')
const app = require('../app.js')
jest.setTimeout(30000)


describe('Testing the job role path', () => {
  test('should get 200 status code', async () => {
    const res = await request(app)
      .get('/job-roles')
    expect(res.statusCode).toEqual(200)
    console.log(res.statusCode);
  })
  
  test('should get 200 status code on capabilities page', async () => {
    const res = await request(app)
      .get('/capabilities/')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code on a signle capability page', async () => {
    const res = await request(app)
      .get('/capabilities/get/Cyber%20Security')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code on matrix', async () => {
    const res = await request(app)
      .get('/capabilities/matrix/Product')
    expect(res.statusCode).toEqual(200)
  })
  test('should get 200 status code on job roles spec page', async () => {
    const res = await request(app)
      .get('/job-roles-spec/2')
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
  test('should get 200 status code on job roles by band page', async () => {
    const res = await request(app)
      .get('/job-roles/by-band')
    expect(res.statusCode).toEqual(200)
  });
  test('should get 200 status code on capability leads page', async () => {
    const res = await request(app)
      .get('/capabilities/leads')
    expect(res.statusCode).toEqual(200)
  });
  test('should get 200 status code on admin home page', async () => {
    const res = await request(app)
      .get('/admin')
    expect(res.statusCode).toEqual(200)
  });
  test('should get 200 status code on delete jobrole page', async () => {
    const res = await request(app)
      .get('/admin/delete-job-roles')
    expect(res.statusCode).toEqual(200)
  });
  test('should get 200 status code on admin jobrole spec page', async () => {
    const res = await request(app)
      .get('/admin/job-roles-spec/2')
    expect(res.statusCode).toEqual(200)
  });
  test('should get 200 status code on admin add  jobrole page', async () => {
    const res = await request(app)
      .get('/admin/add-job-role')
    expect(res.statusCode).toEqual(200)
  });
});

afterAll(async () => {
  console.log('closing...');
  await app.close();
});