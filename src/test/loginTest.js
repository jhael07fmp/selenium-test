// Import necessary Selenium WebDriver components
import { Builder, By, Key, until } from "selenium-webdriver";

// Initialize a WebDriver instance for Chrome
let driver = await new Builder().forBrowser("chrome").build();

// Function to execute all test scenarios
const executeTests = async () => {
  try {
    // Execute registration tests
    await RegisterTest(driver);
    await RegisterFailureTest(driver);
    // Perform login test
    await loginTest(driver);
  } catch (err) {
    // Log any errors during test execution
    console.log("Error", err);
  }
};

// Test function for successful user registration
const RegisterTest = async (driver) => {
  // Navigate to the registration page
  await driver.get("https://selenium-test.vercel.app/register");

  try {
    // Enter registration data and submit the form
    registerInputsData.forEach(async ({ id, value }) => {
      await driver.findElement(By.id(id)).sendKeys(value);
    });
    await driver.findElement(By.className("session-card__button")).click();

    // Get the confirmation message after registration
    const result = await driver.findElement(By.id("swal2-html-container")).getText();

    // Close any pop-up by pressing ESC
    await driver.actions().keyDown(Key.ESCAPE).perform();

    // Wait for logout button and perform logout
    const logoutButton = await driver.wait(until.elementLocated(By.id("logout-btn")), 10000);
    await driver.wait(until.elementIsVisible(logoutButton), 10000);
    await logoutButton.click();

    // Check if user creation was successful
    if (result === "User successfully created")
      console.log("Registration Test Passed! ✅ User was created successfully");
    else console.log("Registration Test Failed! ⛔");
  } catch (err) {
    // Log any errors during registration and quit the driver
    console.log("Error in Register test", err);
    await driver.quit();
  }
};

// Test function for various registration failure scenarios
const RegisterFailureTest = async (driver) => {
  // Navigate to the registration page
  await driver.get("https://selenium-test.vercel.app/register");

  try {
    // Iterate through different invalid registration data scenarios
    for (let i = 0; i < registerFailureInputData.length; i++) {
      registerFailureInputData[i].forEach(
        async ({ id, value }) => await driver.findElement(By.id(id)).sendKeys(value)
      );

      // Click the registration button and get the result message
      await driver.findElement(By.className("session-card__button")).click();
      const result = await driver.findElement(By.id("swal2-html-container")).getText();

      // Close any pop-up by pressing ESC
      await driver.actions().keyDown(Key.ESCAPE).perform();

      // Check if user creation failed as expected
      if (result !== "User successfully created")
        console.log(`${i + 1}: Registration Test Passed! ✅ user was not created as expected`);
      else console.log("Registration Test Failed! ⛔");

      // Clear input fields for the next iteration
      registerFailureInputData[i].forEach(
        async ({ id }) => await driver.findElement(By.id(id)).clear()
      );
    }
  } catch (err) {
    // Log any errors during registration failure tests and quit the driver
    console.log("Error in Register test", err);
    await driver.quit();
  }
};

// Test function for login
const loginTest = async (driver) => {
  // Start by performing a registration test
  await RegisterTest(driver);
  let result = "";

  try {
    // Navigate to the login page
    await driver.get("https://selenium-test.vercel.app/");

    // Enter login credentials
    await driver.findElement(By.id(loginInputsData[0].id)).sendKeys(loginInputsData[0].value);
    await driver.findElement(By.id(loginInputsData[1].id)).sendKeys(loginInputsData[1].value);
    await driver.findElement(By.className("session-card__button")).click();

    // Get the login result message if present
    const modal = await driver.findElement(By.id("swal2-html-container"));

    // Check for possible login error messages
    if (modal) {
      result = await modal.getText();
    }
    switch (result) {
      case "Username or password invalid":
        console.log("Login Test Failed! ⛔ Username or password invalid");
        break;
      case "Password is required":
        console.log("Login Test Failed! ⛔ Password is required");
        break;
      case "Username is required":
        console.log("Login Test Failed! ⛔ Username is required");
        break;
    }
  } catch (err) {
    // Handle potential NoSuchElementError as a successful login, log other errors
    if (err.name === "NoSuchElementError") {
      console.log("Login Test Passed! ✅");
      return;
    }
    console.log("Error in login test", err);
  } finally {
    // Quit the driver after login test
    await driver.quit();
  }
};

// Test data for registration and login
const registerInputsData = [
  { id: "name", value: "Jhael Rodriguez" },
  { id: "username", value: "jhael" },
  { id: "password", value: "Jehlicot07.com" },
];

const registerFailureInputData = [
  // Different sets of invalid registration data
];

const loginInputsData = [
  { id: "username", value: "jhael" },
  { id: "password", value: "Jehlicot07.com" },
];

// Execute all tests
executeTests();
