export const makeGreeting = (name) => {
  return "hello" + name;
};

export const isCommonWesternName = (input) => {
  return input.split(" ").length === 2;
};

export const trigger = (x, y, callback) => {
  callback("callback triggered");
  return x + y;
};

export const makePerson = (name, age) => {
  return {
    name,
    age,
    type: "person",
  };
};
