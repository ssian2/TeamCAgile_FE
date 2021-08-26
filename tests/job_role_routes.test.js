const request = require('supertest')
const app = require('../app')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


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
      .get('/job-roles/by-band')
    expect(res.statusCode).toEqual(200)
  })
});


 
  describe('executing test scenario on the website', () => {
    
    let driver;
// Build the web driver that we will be using in  Test
    beforeAll(async () => {
       driver = new webdriver.Builder()
    .forBrowser('safari')
    .build();
      await driver.get(
        `http://localhost:7999/`,
      );
    }, 20000);
 
  afterAll(async () => {
    await driver.quit();
  }, 15000);
  
  test('it performs a validation of title on the home page', async () => {
    await driver.get('http://localhost:7999/')
    const title = await driver.findElement(By.tagName('h1')).getText()
    expect(title).toContain('What would you like to do?')
  })
 
  test('it performs a validation of the button to roles by band', async () => {
    
    await until.elementLocated(By.id('roles_band_bt'))
    const value = await driver.findElement(By.id('roles_band_bt')).getAttribute('href')
    await driver.get(value)
    const title = await driver.findElement(By.tagName('h1')).getText()
    expect(title).toContain("Job Roles with coresponding bands")
  })

  test('jobe role by band orded by band', async () => {
    await driver.get('http://localhost:7999/job-roles/by-band')
    const title = await driver.findElements(By.tagName('td'))
    expect(title[0].getText()).toEqual(title[1].getText())
  })

})
 
