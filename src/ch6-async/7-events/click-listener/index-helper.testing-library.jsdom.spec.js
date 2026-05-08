import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { fireEvent, getByText, getByTestId } from "@testing-library/dom";
import { JSDOM } from "jsdom";

const __dirname = import.meta.dirname;

const options = {
  resources: "usable",
  runScripts: "dangerously",
};

const loadHtmlAndGetUiElements = async () => {
  const jsdom = await JSDOM.fromFile(__dirname + "/index.html", options);
  const button = getByText(jsdom.window.document.documentElement, "click me", {
    exact: false,
  });
  return {
    window: jsdom.window,
    docElement: jsdom.window.document.documentElement,
    button,
  };
};

describe("index helper", () => {
  let window, docElement, button;
  beforeEach(async () => {
    ({ window, docElement, button } = await loadHtmlAndGetUiElements());
  });
  afterEach(() => window.close());

  test("vanilla button click triggers change in result div (jsdom)", async () => {
    await new Promise((resolve) => window.addEventListener("load", resolve));

    fireEvent.click(button);

    expect(getByTestId(docElement, "myResult").innerText).toEqual("Clicked!");
  });
});
