import { fetchUrlText } from "./network-adapter.js";

export const isWebsiteAlive = async () => {
  try {
    const result = await fetchUrlText("https://example.com/");
    if (!result.ok) {
      throw result.text;
    }
    const text = result.text;
    return processFetchSuccess(text);
  } catch (error) {
    return processFetchFail(error);
  }
};

export const processFetchSuccess = (text) => {
  const included = text.includes("Example Domain");
  if (included) {
    return { success: true, status: "ok" };
  }
  return { success: false, status: "missing text" };
};

export const processFetchFail = (error) => {
  return { success: false, status: error };
};
