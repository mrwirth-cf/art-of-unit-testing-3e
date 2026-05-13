/**
 * @vitest-environment jsdom
 */
import { fireEvent, getByText, getByTestId } from "@testing-library/dom";
import { describe, expect, test } from "vitest";
import path from "path";
import * as fs from "node:fs";
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
require("./index-helper.js");

const __dirname = import.meta.dirname;

const loadHtml = (fileRelativePath) => {
  const filePath = path.join(__dirname, fileRelativePath);
  const innerHtml = fs.readFileSync(filePath);
  document.documentElement.innerHTML = innerHtml.toString();
  return document.documentElement;
};

const loadHtmlAndGetUiElements = () => {
  const docElement = loadHtml("index.html");
  const button = getByText(docElement, "click me", { exact: false });
  return { window, docElement, button };
};

describe("index helper", () => {
  test("vanilla button click triggers change in result div (testing-library/dom)", async () => {
    const { window, docElement, button } = loadHtmlAndGetUiElements();

    fireEvent.load(window);
    fireEvent.click(button);

    console.log(docElement.innerHTML);
    const resultDiv = document.getElementById("myResult");
    console.log("innerHtml", resultDiv.innerHTML);
    console.log("innerText", resultDiv.innerText);
    console.log("textContent", resultDiv.textContent);

    // example's findByText doesn't work because it searches textContent instead of innerText.
    // https://testing-library.com/docs/queries/bytext/
    // > This will search for all elements that have a text node with textContent matching the given TextMatch.
    // and it appears that, at least in this context, textContent only shows the original HTML text content,
    // not the updated value from the JavaScript execution.
    expect(getByTestId(docElement, "myResult").innerText).toBe("Clicked!");
  });
});
