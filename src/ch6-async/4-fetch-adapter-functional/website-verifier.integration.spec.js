import { expect, test } from "vitest";
import * as realNetwork from "./network-adapter.js";
import * as websiteVerifier from "./website-verifier.js";

test("integration test: fetching with callback", async () => {
  const result = await websiteVerifier.isWebsiteAlive(realNetwork);

  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});
