const request = require('supertest')
const app = require('../app')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    
jest.setTimeout(40000);


describe('Executing UI tests on adding a new capability', () => {

    let driver;
    // Build the web driver that we will be using in  Test
    beforeAll(async () => {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        await driver.get(
            `http://localhost:7999/`,
        );
    }, 30000);

    afterAll(async () => {
        await driver.quit();
        await app.close();
        await new Promise(resolve => setTimeout(() => resolve(), 10000));
    }, 40000);

    test('happy path new capability adding', async () => {
        
        await driver.get('http://localhost:7999/admin/add/capability');
        await driver.findElement(By.id('cap_name')).sendKeys("Test Name");
        await driver.findElement(By.id('lead_name')).sendKeys("Test lead name for this capability");
        await driver.findElement(By.id('url')).sendKeys("Test url to photo");
        await driver.findElement(By.id('message')).sendKeys("Test message for this capability lead");
        submitButton = await driver.findElement(By.id("submit-btn"))
        submitButton.click()
        await driver.manage().setTimeouts({ implicit: 20000, pageLoad: 10000 });
        
        await driver.sleep(1000);
        
        const val = await driver.findElement(By.tagName("h1")).getText()
        expect(val).toEqual("Succesfully added a new capability");
        
    })

    test('name too long new capability adding', async () => {
        
        await driver.get('http://localhost:7999/admin/add/capability');
        
        await driver.findElement(By.id('cap_name')).sendKeys("aaaaaaaaaaaaaaaaaaaa");
        await  driver.wait(until.alertIsPresent());
        await driver.findElement(By.id('cap_name')).sendKeys("a");
        
        
        let alert = await driver.switchTo().alert();
        
        let alertText = await alert.getText();
        await alert.accept();
        
        await driver.findElement(By.id('lead_name')).sendKeys("Test lead name for this capability");
        await driver.findElement(By.id('url')).sendKeys("Test url to photo");
        await driver.findElement(By.id('message')).sendKeys("Test message for this capability lead");
        
        submitButton = await driver.findElement(By.id('submit-btn')).click();
        await driver.manage().setTimeouts({ implicit: 20000, pageLoad: 10000 });
        await driver.sleep(10000);
        
        expect(alertText).toEqual("You can't write more than 20 chacters");
        //TODO : glupi alert psuje s
        
    })
    
});