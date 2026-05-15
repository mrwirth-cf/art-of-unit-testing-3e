import { describe, expect, it, vi } from "vitest";
import * as trust from "./trust.js";
import { makePerson, trigger } from "./trust.js";

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
    expect(result).not.toBe("hello abc"); // `not` because code is intentionally incorrect (see prior test).
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

describe("trigger (with too many concerns in one test)", () => {
  // Bad name, and trying to test more than one exit point at the same time.
  it("should work", () => {
    const callback = vi.fn();
    const result = trigger(1, 2, callback);
    expect(result).toBe(3);
    expect(callback).toHaveBeenCalledWith("callback triggered");
  });
});

describe("trigger (with one concern per test)", () => {
  it("triggers a given callback", () => {
    const callback = vi.fn();
    trigger(1, 2, callback);
    expect(callback).toHaveBeenCalledWith("callback triggered");
  });

  it("sums up given values", () => {
    const result = trigger(1, 2, vi.fn());
    expect(result).toBe(3);
  });
});

describe("makePerson (multiple asserts for one concern/test)", () => {
  it("creates person given passed-in values", () => {
    const result = makePerson("name", 1);
    expect(result.name).toBe("name");
    expect(result.age).toBe(1);
  });
});
