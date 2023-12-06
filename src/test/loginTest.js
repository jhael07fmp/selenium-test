import { Builder, By, Key, until } from "selenium-webdriver";
import fs from "fs";

let driver = await new Builder().forBrowser("chrome").build();
// Function to execute all test scenarios
const executeTests = async () => {
  try {
    await RegisterTest(driver);
    await RegisterFailureTest(driver);
    await loginTest(driver);
  } catch (err) {
    console.log("Error", err);
  }
};

const RegisterTest = async (driver) => {
  await driver.get("https://selenium-test.vercel.app/register");

  try {
    registerInputsData.forEach(async ({ id, value }) => {
      await driver.findElement(By.id(id)).sendKeys(value);
    });

    await driver.findElement(By.className("session-card__button")).click();

    const result = await driver.findElement(By.id("swal2-html-container")).getText();

    driver
      .takeScreenshot()
      .then((image) =>
        fs.writeFile("registerTest1.png", image, "base64", (err) => console.log(err))
      );
    await driver.actions().keyDown(Key.ESCAPE).perform();

    const logoutButton = await driver.wait(until.elementLocated(By.id("logout-btn")), 10000);
    await driver.wait(until.elementIsVisible(logoutButton), 10000);
    await logoutButton.click();

    if (result === "User successfully created")
      console.log("Registration Test Passed! ✅ User was created successfully");
    else console.log("Registration Test Failed! ⛔");
  } catch (err) {
    console.log("Error in Register test", err);
    await driver.quit();
  }
};

const RegisterFailureTest = async (driver) => {
  await driver.get("https://selenium-test.vercel.app/register");
  try {
    for (let i = 0; i < registerFailureInputData.length; i++) {
      registerFailureInputData[i].forEach(
        async ({ id, value }) => await driver.findElement(By.id(id)).sendKeys(value)
      );

      await driver.findElement(By.className("session-card__button")).click();

      const result = await driver.findElement(By.id("swal2-html-container")).getText();
      driver
        .takeScreenshot()
        .then((image) =>
          fs.writeFile("registerTest2.png", image, "base64", (err) => console.log(err))
        );
      await driver.actions().keyDown(Key.ESCAPE).perform();

      if (result !== "User successfully created")
        console.log(`${i + 1}: Registration Test Passed! ✅ user was not created as expected`);
      else console.log("Registration Test Failed! ⛔");

      registerFailureInputData[i].forEach(
        async ({ id }) => await driver.findElement(By.id(id)).clear()
      );
    }
  } catch (err) {
    console.log("Error in Register test", err);
    await driver.quit();
  }
};

const loginTest = async (driver) => {
  await RegisterTest(driver);
  let result = "";
  try {
    await driver.get("https://selenium-test.vercel.app/");
    await driver.findElement(By.id(loginInputsData[0].id)).sendKeys(loginInputsData[0].value);
    await driver.findElement(By.id(loginInputsData[1].id)).sendKeys(loginInputsData[1].value);

    await driver.findElement(By.className("session-card__button")).click();

    const modal = await driver.findElement(By.id("swal2-html-container"));

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
    if (err.name === "NoSuchElementError") {
      console.log("Login Test Passed! ✅");
      driver
        .takeScreenshot()
        .then((image) => fs.writeFile("loginTest.png", image, "base64", (err) => console.log(err)));
      return;
    }
    console.log("Error in login test", err);
  } finally {
    await driver.quit();
  }
};

// Execute all tests
executeTests();

const registerInputsData = [
  { id: "name", value: "Jhael Rodriguez" },
  { id: "username", value: "jhael" },
  { id: "password", value: "Jehlicot07.com" },
];

const registerFailureInputData = [
  [
    { id: "name", value: "" },
    { id: "username", value: "" },
    { id: "password", value: "" },
  ],
  [
    { id: "name", value: "jhael" },
    { id: "username", value: "" },
    { id: "password", value: "" },
  ],
  [
    { id: "name", value: "jhael" },
    { id: "username", value: "jhael" },
    { id: "password", value: "" },
  ],
  [
    { id: "name", value: "jhael" },
    { id: "username", value: "jhael" },
    { id: "password", value: "jhael" },
  ],
];

const loginInputsData = [
  { id: "username", value: "jhael" },
  { id: "password", value: "Jehlicot07.com" },
];
