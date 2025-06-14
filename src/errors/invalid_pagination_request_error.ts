import { BaseError } from "./base";

export class InvalidPaginationRequestError extends BaseError {
  constructor() {
    super(400, "Invalid pagination request.");
  }
}
