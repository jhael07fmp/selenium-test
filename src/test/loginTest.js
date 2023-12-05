import { Builder, By, Key } from "selenium-webdriver";

// Function to execute all test scenarios
const executeTests = async () => {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://selenium-test.vercel.app/register");
    await errorIfFullNameIsMissing(driver);

    await driver.get("https://selenium-test.vercel.app/");

    await errorIfUsernameIsMissing(driver);
    await errorIfPasswordIsMissing(driver);
  } catch (err) {
    console.log("Error", err);
  } finally {
    await driver.quit();
  }
};

// Function to check if username field is empty
const errorIfUsernameIsMissing = async (driver) => {
  try {
    await driver.findElement(By.id("username")).sendKeys("", Key.RETURN);
    const result = await driver.findElement(By.id("swal2-html-container")).getText();

    if (result === "Username is required") console.log("Username Test Passed!");
    else console.log("Username Test Failed!");
  } catch (err) {
    console.log("Error in username test", err);
  }
};

// Function to check if password field is empty
const errorIfPasswordIsMissing = async (driver) => {
  try {
    await driver.findElement(By.id("username")).sendKeys("user");
    await driver.findElement(By.id("password")).sendKeys("", Key.RETURN);
    const result = await driver.findElement(By.id("swal2-html-container")).getText();

    if (result === "Password is required") console.log("Password Test Passed!");
    else console.log("Password Test Failed!");
  } catch (err) {
    console.log("Error in password test", err);
  }
};

// Function to check if username field is empty
const errorIfFullNameIsMissing = async (driver) => {
  try {
    await driver.findElement(By.id("name")).sendKeys("", Key.RETURN);
    const result = await driver.findElement(By.id("swal2-html-container")).getText();

    if (result === "Full name is required") console.log("Name in register Test Passed!");
    else console.log("Name in register Test Failed!");
  } catch (err) {
    console.log("Error in username test", err);
  }
};

// Execute all tests
executeTests();
