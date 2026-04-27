import { expect, test } from "vitest";
import * as samples from "./fetching-samples-promises.js";

test("NETWORK REQUIRED (callback): correct content, true", async () => {
  const result = await samples.isWebsiteAlive();

  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});
