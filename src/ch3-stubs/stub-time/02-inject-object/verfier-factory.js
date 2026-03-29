import { PasswordVerifier } from "./password-verifier-time02.js";
import { RealTimeProvider } from "./time-provider.js";

const passwordVerifierFactory = (rules) => {
  return new PasswordVerifier(new RealTimeProvider());
};

export { passwordVerifierFactory };
