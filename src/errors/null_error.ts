import { BaseError } from "./base";

export class NullError extends BaseError {
  constructor(fields: string[]) {
    super(
      400,
      fields.reduce((prev, cur) => prev + ", " + cur) + " must not be null."
    );
  }
}
