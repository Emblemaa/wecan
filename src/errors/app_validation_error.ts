import { BaseError } from "./base";
import { ValidationError } from "express-validator";

export class AppValidationError extends BaseError {
  public errors!: ValidationError[];

  constructor(errors: ValidationError[]) {
    super(400, "Bad request!");
    this.errors = errors;
  }
}
