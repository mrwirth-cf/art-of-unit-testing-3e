// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import * as fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
require("./index-helper.js");

const __dirname = import.meta.dirname;

const loadHtml = (fileRelativePath) => {
  const filePath = path.join(__dirname, fileRelativePath);
  const innerHtml = fs.readFileSync(filePath);
  document.documentElement.innerHTML = innerHtml.toString();
};

const loadHtmlAndGetUiElements = () => {
  loadHtml("index.html");
  const button = document.getElementById("myButton");
  const resultDiv = document.getElementById("myResult");
  return { window, button, resultDiv };
};

describe("index helper", () => {
  test("vanilla button click triggers change in result div", () => {
    const { window, button, resultDiv } = loadHtmlAndGetUiElements();
    window.dispatchEvent(new Event("load"));

    button.click();

    expect(resultDiv.innerText).toEqual("Clicked!");
  });
});
