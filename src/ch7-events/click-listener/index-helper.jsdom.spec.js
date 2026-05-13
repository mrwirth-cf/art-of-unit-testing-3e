import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { JSDOM } from "jsdom";

const __dirname = import.meta.dirname;

const options = {
  resources: "usable",
  runScripts: "dangerously",
};

const loadHtmlAndGetUiElements = async () => {
  const jsdom = await JSDOM.fromFile(__dirname + "/index.html", options);
  const button = jsdom.window.document.getElementById("myButton");
  const resultDiv = jsdom.window.document.getElementById("myResult");
  return { window: jsdom.window, button, resultDiv };
};

describe("index helper", () => {
  let window, button, resultDiv;
  beforeEach(async () => {
    ({ window, button, resultDiv } = await loadHtmlAndGetUiElements());
  });
  afterEach(() => window.close());

  test("vanilla button click triggers change in result div (jsdom)", async () => {
    await new Promise((resolve) => window.addEventListener("load", resolve));

    button.click();

    expect(resultDiv.innerText).toEqual("Clicked!");
  });
});
