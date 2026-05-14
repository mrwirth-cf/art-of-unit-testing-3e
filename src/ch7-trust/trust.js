export const makeGreeting = (name) => {
  return "hello" + name;
};

export const isCommonWesternName = (input) => {
  return input.split(" ").length === 2;
};
