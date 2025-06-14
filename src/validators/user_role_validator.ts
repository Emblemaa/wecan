import { body } from "express-validator";

export const userRoleValidator = () =>
  body("role").custom((value: number) => {
    if (!Number.isInteger(value) || (value !== 1 && value !== 2))
      throw new Error("Invalid user role.");
    return true;
  });
