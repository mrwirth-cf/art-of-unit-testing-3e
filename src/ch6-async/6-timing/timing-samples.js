export const calculate1 = (x, y, resultCallback) => {
  setTimeout(() => {
    resultCallback(x + y);
  }, 50000);
};

export const calculate4 = (getInputsFn, resultFn) => {
  setInterval(() => {
    const { x, y } = getInputsFn();
    resultFn(x + y);
  }, 10000);
};
