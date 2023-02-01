export interface GuardResult {
  succeeded: boolean;
  message?: string;
}

export interface GuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = GuardArgument[];

export class Guard {
  public static combine(guardResults: GuardResult[]): GuardResult {
    for (const result of guardResults) {
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static greaterThan(minValue: number, actualValue: number): GuardResult {
    return actualValue > minValue
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Number given {${actualValue}} is not greater than {${minValue}}`,
        };
  }

  public static againstAtLeast(numChars: number, text: string): GuardResult {
    return text.length >= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is not at least ${numChars} chars.`,
        };
  }

  public static againstAtMost(numChars: number, text: string): GuardResult {
    return text.length <= numChars
      ? { succeeded: true }
      : {
          succeeded: false,
          message: `Text is greater than ${numChars} chars.`,
        };
  }

  public static againstNullOrUndefined(argument: any, argumentName: string): GuardResult {
    if (argument === null || argument === undefined) {
      return {
        succeeded: false,
        message: `${argumentName} is null or undefined`,
      };
    }

    return { succeeded: true };
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): GuardResult {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (!result.succeeded) return result;
    }

    return { succeeded: true };
  }

  public static isOneOf(value: any, validValues: any[], argumentName: string): GuardResult {
    for (const validValue of validValues) {
      if (value === validValue) {
        return { succeeded: true };
      }
    }

    return {
      succeeded: false,
      message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
        validValues,
      )}. Got "${value}".`,
    };
  }

  public static inRange(num: number, min: number, max: number, argumentName: string): GuardResult {
    const isInRange = num >= min && num <= max;
    if (isInRange) {
      return { succeeded: true };
    }
    return {
      succeeded: false,
      message: `${argumentName} is not within range ${min} to ${max}.`,
    };
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string,
  ): GuardResult {
    let failingResult: GuardResult | null = null;
    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.succeeded) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return {
        succeeded: false,
        message: `${argumentName} is not within the range.`,
      };
    } else {
      return { succeeded: true };
    }
  }

  public static compareDateRange(startDate: Date, endDate: Date): GuardResult {
    return startDate < endDate
      ? { succeeded: true }
      : {
          succeeded: false,
          message: 'Start date must be less than end date.',
        };
  }
}
