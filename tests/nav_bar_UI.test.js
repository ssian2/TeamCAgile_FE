const request = require('supertest')
const app = require('../app')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    describe('Check the navigation bar links', () => {

        let driver;
        // Build the web driver that we will be using in  Test
        beforeAll(async () => {
            driver = new webdriver.Builder()
                .forBrowser('safari')
                .build();
            await driver.get(
                `http://localhost:7999/`,
            );
        }, 30000);
    
        afterAll(async () => {
            await driver.quit();
            await app.close();
            await new Promise(resolve => setTimeout(() => resolve(), 10000));
        }, 15000);
    
        test('Test the home link', async () => {
            await driver.get('http://localhost:7999/')
            const home_link = await driver.findElement(By.id('Home-nav-link'));
            home_link.click();
        })    
    })