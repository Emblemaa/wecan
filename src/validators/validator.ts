import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppValidationError } from "../errors";

export function validator(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = new AppValidationError(result.array());
    console.log(error);
    return res.status(error.code).json(error);
  }
  next();
}
