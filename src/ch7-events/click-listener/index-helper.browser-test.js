import { describe, expect, test } from "vitest";

describe("index helper", async () => {
  test("vanilla button click triggers change in result div", async () => {
    console.log(document.documentElement.innerHTML);

    const loaded = new Promise((resolve) =>
      window.addEventListener("load", resolve),
    );
    window.dispatchEvent(new Event("load"));
    await loaded;

    const button = document.getElementById("myButton");
    const resultDiv = document.getElementById("myResult");
    console.log(resultDiv);

    button.click();

    // jsdom and browser-test conflict with each other given the limits
    // of the browser testing framework.  In particular:
    // - There's no way to directly load `index.html` into the browser test,
    // - Except by a top-level configuration in `vite.config.js` which is
    //   relative to the project root and embedded in generated script located
    //   at the root.
    //   - As such, it expects the `src` attribute to also be relative to
    //     the project root as well.
    // jsdom however, loads the file locally and thus respects the typical
    // expectations for relative loading.
    expect(resultDiv.innerText).toEqual("Waiting...");
  });
});
