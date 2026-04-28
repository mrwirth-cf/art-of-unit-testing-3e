import { beforeEach, describe, expect, test, vi } from "vitest";
// stub is actually synchronous, not async like original.
import * as stubNetworkAdapter from "./network-adapter.js";
import * as websiteVerifier from "./website-verifier.js";

vi.mock("./network-adapter.js");

describe("unit test website verifier", () => {
  beforeEach(vi.resetAllMocks);

  test("with good content, returns true", async () => {
    stubNetworkAdapter.fetchUrlText.mockReturnValue({
      ok: true,
      text: "Example Domain",
    });

    const result = await websiteVerifier.isWebsiteAlive();

    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
  });

  test("with bad content, returns false", async () => {
    stubNetworkAdapter.fetchUrlText.mockReturnValue({
      ok: true,
      text: "<span>hello world</span>",
    });

    const result = await websiteVerifier.isWebsiteAlive();

    expect(result.success).toBe(false);
    expect(result.status).toBe("missing text");
  });
});
