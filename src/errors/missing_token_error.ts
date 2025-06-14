import { BaseError } from "./base";

export class MissingTokenError extends BaseError {
  constructor() {
    super(401, "A token is required for authorization.");
  }
}
