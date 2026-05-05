import * as Samples from "./timing-samples.js";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

describe("monkey patching", () => {
  const originalTimeOut = setTimeout;
  // beforeEach(() => (originalTimeOut = setTimeout));
  // eslint-disable-next-line no-global-assign
  afterEach(() => (setTimeout = originalTimeOut));

  test("calculate1", () => {
    // eslint-disable-next-line no-global-assign,@typescript-eslint/no-unused-vars
    setTimeout = (callback, _ms) => callback();
    Samples.calculate1(1, 2, (result) => {
      expect(result).toBe(3);
    });
  });
});

describe("calculate1 - with vitest helper functions", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.clearAllMocks());

  test("fake timeout with callback", () => {
    Samples.calculate1(1, 2, (result) => {
      expect(result).toBe(3);
    });
    vi.runAllTimers();
  });
});

describe("calculate with intervals", () => {
  beforeEach(vi.useFakeTimers);
  afterEach(() => vi.clearAllMocks());

  test("calculate, incr input/output, calculates correctly", () => {
    let xInput = 1;
    let yInput = 2;
    const inputFn = () => ({ x: xInput++, y: yInput++ });
    const results = [];

    Samples.calculate4(inputFn, (result) => results.push(result));
    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();

    expect(results[0]).toBe(3);
    expect(results[1]).toBe(5);
  });
});
