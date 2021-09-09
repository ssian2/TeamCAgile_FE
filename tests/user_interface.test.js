const request = require('supertest')
const app = require('../app')
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
    
jest.setTimeout(40000);

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



describe('Executing test scenario on the website', () => {

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
    }, 15000);

    test('it performs a validation of title on the home page', async () => {
        await driver.get('http://localhost:7999/')
        const title = await driver.findElement(By.tagName('h1')).getText()
        expect(title).toContain('What would you like to do?')
    })

    test('it performs a validation of order by band page', async () => {
        await driver.get("http://localhost:7999/job-roles/by-band")
        const title = await driver.findElement(By.tagName('h1')).getText()
        expect(title).toContain("Job Roles with Corresponding Bands")
    })

    test('jobe role by band orded by band', async () => {
        await driver.get('http://localhost:7999/job-roles/by-band')
        const title = await driver.findElements(By.tagName('td'))
            expect(title[0].getText()).toEqual(title[1].getText());
    })

    test('it displays responsibility in job spec', async () => {
        await driver.get('http://localhost:7999/job-roles-spec/2')
        const title = await driver.findElement(By.id('responsibility-title')).getText()
        expect(title).toEqual('Responsibilities')
    })
    test('it displays competencies title on competencies page', async () => {
        await driver.get('http://localhost:7999/bands-training/bands-competencies')
        const title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Competencies of bands')
    })
    test('it displays training title on training page', async () => {
        await driver.get('http://localhost:7999/bands-training')
        const title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Job Training')
    })

    test('it displays title on matrix page', async () => {
        await driver.get('http://localhost:7999/capabilities/matrix/Product')
        const title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Job Roles By Band and Job Family')
    })

    test('it displays title on capability page', async () => {
        await driver.get('http://localhost:7999/capabilities')
        const title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Job Role Capabilities')
    })

    test('it displays title on capability page', async () => {
        await driver.get('http://localhost:7999/capabilities/get/Cyber%20Security')
        const title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Capability Details')
    })

    test('it displays title on capability lead page', async () => {
        await driver.get('http://localhost:7999/capabilities/leads')
        const title = await driver.findElement(By.id('text')).getText()
        expect(title).toEqual('Capability Leads')
    })

    test('it displays admin tile on home page', async () => {
        await driver.get('http://localhost:7999')
        const title = await driver.findElement(By.id('admin-homepage-tile')).getText()
        expect(title).toEqual('Open admin dashboard')
    })

    test('it performs validation on Delete Roles button on admin dashboard', async () => {
        await driver.get('http://localhost:7999/admin')
        const title = await driver.findElement(By.id('admin-dashboard-delete-button')).getAttribute('href')
        expect(title).toEqual('http://localhost:7999/admin/delete-job-roles')
        await driver.get(title)
        const newtitle = await driver.findElement(By.id('text')).getText()
        expect(newtitle).toEqual('Job Roles')
    })
})


describe('Executing UI tests on adding a new jobrole', () => {

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

    test('happy path new job role adding', async () => {
        
        await driver.get('http://localhost:7999/admin/add-job-role');
        await driver.findElement(By.id('name')).sendKeys("Test Name");
        await driver.findElement(By.id('summary')).sendKeys("Test summary for this job role");
        submitButton = await driver.findElement(By.xpath("/html/body/div[2]/div/form/button"))
        submitButton.click()
        
        
    })
    test('name too long new job role adding', async () => {
        
        await driver.get('http://localhost:7999/admin/add-job-role');
        await driver.findElement(By.id('name')).sendKeys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        await driver.findElement(By.id('summary')).sendKeys("Test summary for this job role");
        submitButton = await driver.findElement(By.id('submit-btn')).click();

        await driver.manage().setTimeouts({ implicit: 20000, pageLoad: 10000 });
        const err = await driver.findElement(By.xpath("/html/body/div[2]/div/form/div[3]/div")).getText()
        expect(err).toEqual("Error! Value is too long.")
        
    })

    test('summary too long new job role adding', async () => {
        
        await driver.get('http://localhost:7999/admin/add-job-role');
        await driver.findElement(By.id('name')).sendKeys("tes_name");
        await driver.findElement(By.id('summary')).sendKeys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        submitButton = await driver.findElement(By.id('submit-btn')).click();

        await driver.manage().setTimeouts({ implicit: 20000, pageLoad: 10000 });
        const err = await driver.findElement(By.xpath("/html/body/div[2]/div/form/div[4]/div")).getText()
        expect(err).toEqual("Error! Value is too long.")
        
    })
    
});



