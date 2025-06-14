import { BaseError } from "./base";

export class InvalidTokenError extends BaseError {
  constructor() {
    super(401, "Invalid token.");
  }
}
