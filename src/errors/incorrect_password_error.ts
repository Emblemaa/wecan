import { BaseError } from "./base";

export class IncorrectLoginError extends BaseError {
  constructor() {
    super(401, "Incorrect username or password.");
  }
}
