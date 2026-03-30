import * as logger from "./complicated-logger.js";
import * as configs from "./configuration-service.js";

const originalDependencies = {
  log: logger,
  configs,
};

let dependencies = { ...originalDependencies };

const resetDependencies = () => {
  dependencies = { ...originalDependencies };
};

const injectDependencies = (fakes) => {
  Object.assign(dependencies, fakes);
};

const log = (text) => {
  if (dependencies.configs.getLogLevel() === "info") {
    dependencies.log.info(text);
  }
  if (dependencies.configs.getLogLevel() === "debug") {
    dependencies.log.debug(text);
  }
};

const verifyPassword = (input, rules) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);

  if (failed.length === 0) {
    log("PASSED");
    return true;
  }

  log("FAILED");
  return false;
};

export { injectDependencies, resetDependencies, verifyPassword };
