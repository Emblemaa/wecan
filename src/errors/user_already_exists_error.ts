import { BaseError } from "./base";

export class UserAlreadyExistsError extends BaseError {
  constructor(username: string) {
    super(400, "Username " + username + " is already taken.");
  }
}
