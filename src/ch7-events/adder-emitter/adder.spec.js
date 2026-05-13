import { describe, expect, it } from "vitest";
import { Adder } from "./adder.js";

describe("events based module", () => {
  describe("add", () => {
    it("generates addition event when called", () =>
      new Promise((done) => {
        const adder = new Adder();
        adder.on("added", (result) => {
          expect(result).toBe(3);
          done();
        });

        adder.add(1, 2);
      }));
  });
});
