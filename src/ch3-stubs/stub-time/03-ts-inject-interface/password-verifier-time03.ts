import type { TimeProviderInterface } from "./time-provider-interface";
import { DaysOfWeek } from "../DaysOfWeek";

export type RuleType = (input: string) => boolean;

export class PasswordVerifier {
  private _timeProvider: TimeProviderInterface;

  constructor(_rules: RuleType[], timeProvider: TimeProviderInterface) {
    this._timeProvider = timeProvider;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verify(_input: string): string[] {
    const isWeekend =
      [DaysOfWeek.SATURDAY, DaysOfWeek.SUNDAY].filter(
        (x) => x === this._timeProvider.getDay(),
      ).length > 0;

    if (isWeekend) {
      throw new Error("It's the weekend!");
    }

    // more logic goes here
    return [];
  }
}
