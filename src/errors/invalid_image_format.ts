import { BaseError } from "./base";

export class InvalidImageFormatError extends BaseError {
  constructor() {
    super(400, "Invalid file, must be in PNG, JPG or JPEG format.");
  }
}
