// Entry point
export const isWebsiteAlive = async () => {
  try {
    const resp = await fetch("https://example.com");
    throwIfResponseNotOK(resp);
    const text = await resp.text();
    return processFetchContent(text);
  } catch (error) {
    return processFetchError(error);
  }
};

export const throwIfResponseNotOK = (resp) => {
  if (!resp.ok) {
    throw resp.statusText;
  }
};

export const processFetchContent = (text) => {
  const included = text.includes("Example Domain");
  if (included) {
    return { success: true, status: "ok" };
  }
  return { success: false, status: "missing text" };
};

export const processFetchError = (error) => {
  return { success: false, status: error };
};
