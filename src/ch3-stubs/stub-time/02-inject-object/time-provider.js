import dayjs from "dayjs";

const RealTimeProvider = () => {
  this.getDay = () => dayjs().day();
};

export { RealTimeProvider };
