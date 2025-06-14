import { BaseError } from "./base";

export class AdminRequiredError extends BaseError {
  constructor() {
    super(403, "Unauthorized to access the resource.");
  }
}
