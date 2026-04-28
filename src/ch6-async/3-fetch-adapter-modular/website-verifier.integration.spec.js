import { expect, test } from "vitest";
import * as websiteVerifier from "./website-verifier.js";

test("integration test: fetching with callback", async () => {
  const result = await websiteVerifier.isWebsiteAlive();

  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});
