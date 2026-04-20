import type { IComplicatedLogger } from "../02-longinterfaces-faking/interfaces/complicated-logger.ts";
import type { MaintenanceWindow } from "./maintenance-window.ts";

export type Rule = (input: string) => boolean;

export class PasswordVerifier3 {
  private _rules: Rule[];
  private _logger: IComplicatedLogger;
  private _maintenanceWindow: MaintenanceWindow;

  constructor(
    rules: Rule[],
    logger: IComplicatedLogger,
    maintenanceWindow: MaintenanceWindow,
  ) {
    this._rules = rules;
    this._logger = logger;
    this._maintenanceWindow = maintenanceWindow;
  }

  verify(input: string): boolean {
    if (this._maintenanceWindow.isUnderMaintenance()) {
      this._logger.info("Under Maintenance", "verify");
    }

    const failed = this._rules
      .map((rule) => rule(input))
      .filter((result) => result === false);

    if (failed.length === 0) {
      this._logger.info("PASSED", "verify");
      return true;
    }

    this._logger.info("FAILED", "verify");
    return false;
  }
}
