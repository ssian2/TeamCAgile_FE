let request = require('supertest')
let app = require('../app')
let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
jest.setTimeout(15000)

let getElementXpath = async (driver, xpath, timeout = 3000) => {
    let el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};


let getElementName = async (driver, name, timeout = 3000) => {
    let el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

let getElementId = async (driver, id, timeout = 3000) => {
    let el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};



describe('Executing test scenario on the website', () => {

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

    test('it performs a validation of title on the home page', async () => {
        await driver.get('http://localhost:7999/')
        let index_title = await driver.findElement(By.tagName('h1')).getText()
        expect(index_title).toContain('What would you like to do?')
    })

    test('it performs a validation of the button to roles by band', async () => {

        await until.elementLocated(By.id('roles_band_bt'))
        let button = await driver.findElement(By.id('roles_band_bt')).click();
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toEqual("http://localhost:7999/job-roles/by-band");
    })

    test('job role by band', async () => {
        await driver.get('http://localhost:7999/job-roles/by-band')
        let title = await driver.findElements(By.tagName('td'))
            expect(title[0].getText()).toEqual(title[1].getText());
    })

    test('it displays responsibility in job spec', async () => {
        await driver.get('http://localhost:7999/job-roles-spec/2')
        let title = await driver.findElement(By.id('responsibility-title')).getText()
        expect(title).toEqual('Responsibilities')
    })
    test('it displays competencies title on competencies page', async () => {
        await driver.get('http://localhost:7999/bands-training/bands-competencies')
        let title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Competencies of bands')
    })
    test('it displays training title on training page', async () => {
        await driver.get('http://localhost:7999/bands-training')
        let title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Job Training')
    })

    test('it displays title on matrix page', async () => {
        await driver.get('http://localhost:7999/capabilities/matrix/Product')
        let title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Job Roles By Band and Job Family')
    })

    test('it displays title on capability page', async () => {
        await driver.get('http://localhost:7999/capabilities')
        let title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Job Role Capabilities')
    })

    test('it displays title on capability job family page', async () => {
        await driver.get('http://localhost:7999/capabilities/get/Cyber%20Security')
        let title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Capability Details')
    })

    test('it displays title on capability lead page', async () => {
        await driver.get('http://localhost:7999/capabilities/leads')
        let title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Capability Leads')
    })
})