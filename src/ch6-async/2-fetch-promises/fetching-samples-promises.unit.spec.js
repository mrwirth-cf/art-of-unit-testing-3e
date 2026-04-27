import { describe, expect, test } from "vitest";
import * as samples from "./fetching-samples-promises.js";

describe("website up check", () => {
  test("on fetch success with good content, returns true", () => {
    const result = samples.processFetchContent("Example Domain");

    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
  });

  test("on fetch success with bad content, returns false", () => {
    const result = samples.processFetchContent("text not on site");

    expect(result.success).toBe(false);
    expect(result.status).toBe("missing text");
  });

  test("on response not OK, throws", () => {
    expect(() =>
      samples.throwIfResponseNotOK({
        ok: false,
        statusText: "response not ok",
      }),
    ).toThrow("response not ok");
  });

  test("on fetch fail, returns false", () => {
    const result = samples.processFetchError("error text");

    expect(result.success).toBe(false);
    expect(result.status).toBe("error text");
  });
});
