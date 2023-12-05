import { Builder, By, Key } from "selenium-webdriver";

let driver = await new Builder().forBrowser("chrome").build();

const ErrorIfUsernameIsMissing = async () => {
  await driver.get("https://selenium-test.vercel.app/");

  await driver.findElement(By.id("username")).sendKeys("");
  await driver.findElement(By.className("session-card__button")).click();
  const response = await driver.findElement(By.id("swal2-html-container")).getText();

  if (response === "Password is required") console.log("Test Passed!");
  else console.log("Test Failed!");

  setTimeout(async () => {
    await driver.quit();
  }, 5000);
};

ErrorIfUsernameIsMissing();
