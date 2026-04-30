import { expect, test } from "vitest";
import { NetworkAdapter } from "./network-adapter.ts";
import { WebsiteVerifier } from "./website-verifier.ts";

test("integration test: fetching with class", async () => {
  const verifier = new WebsiteVerifier(new NetworkAdapter());

  const result = await verifier.isWebsiteAlive();

  expect(result.success).toBe(true);
  expect(result.status).toBe("ok");
});
