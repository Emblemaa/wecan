import { BaseError } from "./base";

export class ImageNotFoundError extends BaseError {
  constructor() {
    super(404, "Image not found.");
  }
}
