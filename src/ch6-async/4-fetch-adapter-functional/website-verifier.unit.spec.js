import { describe, expect, test } from "vitest";
import * as websiteVerifier from "./website-verifier.js";

const makeStubNetworkWithResults = (fakeResult) => {
  return {
    fetchUrlText: () => {
      return fakeResult;
    },
  };
};

describe("unit test website verifier", () => {
  test("with good content, returns true", async () => {
    const stubSyncNetwork = makeStubNetworkWithResults({
      ok: true,
      text: "Example Domain",
    });

    const result = await websiteVerifier.isWebsiteAlive(stubSyncNetwork);

    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
  });

  test("with bad content, returns false", async () => {
    const stubSyncNetwork = makeStubNetworkWithResults({
      ok: true,
      text: "<span>hello world</span>",
    });

    const result = await websiteVerifier.isWebsiteAlive(stubSyncNetwork);

    expect(result.success).toBe(false);
    expect(result.status).toBe("missing text");
  });
});
