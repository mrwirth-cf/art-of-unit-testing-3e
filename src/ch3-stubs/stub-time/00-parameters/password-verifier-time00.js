import dayjs from "dayjs";

const SUNDAY = 0,
  SATURDAY = 6;

const verifyPassword = (input, rules) => {
  const dayOfWeek = dayjs().day();
  if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
    throw Error("It's the weekend!");
  }
  // more code goes here
  // return list of errors found...
  return [];
};

export { verifyPassword };
