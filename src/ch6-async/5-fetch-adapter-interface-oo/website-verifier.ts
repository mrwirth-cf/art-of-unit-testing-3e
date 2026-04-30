import type {
  INetworkAdapter,
  NetworkAdapterFetchResults,
} from "./INetworkAdapter.ts";
import type { NetworkAdapter } from "./network-adapter.ts";

export interface WebsiteAliveResult {
  success: boolean;
  status: string;
}

export class WebsiteVerifier {
  private networkAdapter: NetworkAdapter;

  constructor(network: INetworkAdapter) {
    this.networkAdapter = network;
  }

  isWebsiteAlive = async (): Promise<WebsiteAliveResult> => {
    let netResult: NetworkAdapterFetchResults;
    try {
      netResult = await this.networkAdapter.fetchUrlText(
        "https://www.example.com/",
      );
      if (!netResult.ok) {
        throw netResult.text;
      }
      const text = netResult.text;
      return this.processNetSuccess(text);
    } catch (error) {
      throw this.processNetFail(error);
    }
  };

  processNetSuccess = (text: string): WebsiteAliveResult => {
    const included = text.includes("Example Domain");
    if (included) {
      return { success: true, status: "ok" };
    }
    return { success: false, status: "missing text" };
  };

  processNetFail = (error: unknown): WebsiteAliveResult => {
    return {
      success: false,
      status: typeof error === "string" ? error : "unknown error",
    };
  };
}
