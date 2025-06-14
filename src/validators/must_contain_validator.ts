import { body, param } from "express-validator";

export const bodyMustContain = (field: string) =>
  body(field)
    .notEmpty()
    .withMessage(field + " must not be null or empty.");

export const paramsMustContain = (field: string) =>
  param(field)
    .notEmpty()
    .withMessage(field + " must not be null or empty.");
