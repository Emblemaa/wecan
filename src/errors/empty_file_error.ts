import { BaseError } from "./base";

export class EmptyFileError extends BaseError {
  constructor() {
    super(400, "Body must contain a file.");
  }
}
