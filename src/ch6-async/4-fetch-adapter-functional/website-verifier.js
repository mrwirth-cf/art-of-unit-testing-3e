export const isWebsiteAlive = async (network) => {
  const result = await network.fetchUrlText("https://example.com/");
  if (result.ok) {
    const text = result.text;
    return onFetchSuccess(text);
  }
  return onFetchError(result.text);
};

export const onFetchSuccess = (text) => {
  const included = text.includes("Example Domain");
  if (included) {
    return { success: true, status: "ok" };
  }
  return { success: false, status: "missing text" };
};

export const onFetchError = (error) => {
  return { success: false, status: error };
};
