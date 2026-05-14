import { describe, expect, it } from "vitest";
import * as trust from "./trust.js";

describe("makeGreeting", () => {
  // This version is wrong because it reuses the same (faulty) logic
  // as the code being tested.
  it("returns correct greeting for name", () => {
    const name = "abc";
    const result = trust.makeGreeting(name);
    expect(result).toBe("hello" + name);
  });

  // This version correctly hardcodes the expected value.
  it("returns incorrect greeting for name 2", () => {
    const result = trust.makeGreeting("abc");
    expect(result).toBe("helloabc"); // Actual expectation: "hello abc"
  });
});

describe("isCommonWesternName", () => {
  const namesToTest = ["firstOnly", "first second", ""];

  // This version is wrong because it's doing its own logic to determine the outcome.
  it("correctly finds out if it matches a certain common Western name pattern", () => {
    namesToTest.forEach((name) => {
      const result = trust.isCommonWesternName(name);
      if (name.includes(" ")) {
        expect(result).toBe(true);
      } else {
        expect(result).toBe(false);
      }
    });
  });
});
