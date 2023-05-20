const { By, Builder, Browser, until, Key } = require("selenium-webdriver");

let driver;

// Build a new driver for each test
beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });
  
  // Quit a driver after each test
  afterEach(async () => {
    await driver.quit();
  });

  describe("test the movie input to verify movie was added", ()=>{

    test('input HelloWorld into the input box and verify HelloWorld was listed once submitted',async ()=>{

        await driver.get("http://localhost:3000/");

        await driver.findElement(By.name("movieTitle")).sendKeys("HelloWorld",Key.RETURN);
        
        let displayed = await driver.findElement(By.xpath("html[1]/body[1]/main[1]/section[2]")).getText()

        expect(displayed).toContain("HelloWorld")

    });
    test('delete Functionality',async()=>{

    await driver.get("http://localhost:3000/");

    await driver.findElement(By.name("movieTitle")).sendKeys("HelloWorld",Key.RETURN);
    
    await driver.findElement(By.className("delete-btn")).click();

    const deleter = await driver.findElement(By.id('message')).getText()

    expect(deleter).toContain("HelloWorld deleted!")

    })

    test('checked objects give alert saying Watched HelloWorld', async()=>{

      await driver.get("http://localhost:3000/");

      await driver.findElement(By.name("movieTitle")).sendKeys("HelloWorld",Key.RETURN);

      await driver.findElement(By.id('movie-0')).click();

      const newPopUp = await driver.findElement(By.id('message')).getText();

     expect(newPopUp).toContain("Watched HelloWorld");

    })
  })