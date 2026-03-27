// Using dayjs as moment is deprecated, apparently with good reason.
import dayjs from "dayjs";
import { verifyPassword } from "./password-verifier-time00.js";

const SUNDAY = 0,
  SATURDAY = 6,
  MONDAY = 1;

describe("verifier", () => {
  const TODAY = dayjs().day();

  // test is always executed, but might not do anything.
  test("on weekends, throws exceptions", () => {
    if ([SATURDAY, SUNDAY].includes(TODAY)) {
      expect(() => verifyPassword("anything", [])).toThrow("It's the weekend!");
    }
  });
  // test is not executed on weekdays at all
  if ([SATURDAY, MONDAY].includes(TODAY)) {
    test("on a weekend, throws an error", () => {
      expect(() => verifyPassword("anything", [])).toThrow("It's the weekend!");
    });
  }
});
