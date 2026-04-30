import { describe, expect, test } from "vitest";
import type {
  INetworkAdapter,
  NetworkAdapterFetchResults,
} from "./INetworkAdapter.ts";
import { Arg, Substitute } from "@fluffy-spoon/substitute";
import { WebsiteVerifier } from "./website-verifier.ts";

const makeStubNetworkWithResult = (
  fakeResult: NetworkAdapterFetchResults,
): INetworkAdapter => {
  const stubNetwork = Substitute.for<INetworkAdapter>();
  stubNetwork.fetchUrlText(Arg.any()).returns(Promise.resolve(fakeResult));
  return stubNetwork;
};

describe("unit test website verifier", () => {
  test("with good content, returns true", async () => {
    const stubSyncNetwork = makeStubNetworkWithResult({
      ok: true,
      text: "Example Domain",
    });
    const webVerifier = new WebsiteVerifier(stubSyncNetwork);

    const result = await webVerifier.isWebsiteAlive();

    expect(result.success).toBe(true);
    expect(result.status).toBe("ok");
  });

  test("with bad content, returns false", async () => {
    const stubSyncNetwork = makeStubNetworkWithResult({
      ok: true,
      text: "unexpected content",
    });
    const webVerifier = new WebsiteVerifier(stubSyncNetwork);

    const result = await webVerifier.isWebsiteAlive();

    expect(result.success).toBe(false);
    expect(result.status).toBe("missing text");
  });

  test("with bad url or network, throws", async () => {
    const stubSyncNetwork = makeStubNetworkWithResult({
      ok: false,
      text: "404",
    });
    const webVerifier = new WebsiteVerifier(stubSyncNetwork);

    await expect(webVerifier.isWebsiteAlive()).rejects.toThrow({
      success: false,
      status: "404",
    });
  });
});
