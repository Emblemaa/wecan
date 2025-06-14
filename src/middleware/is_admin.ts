import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/users";
import { CurrentUser, JwtRequest } from "./auth";
import { AdminRequiredError } from "../errors";

export function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const role = ((req as JwtRequest).user as CurrentUser).role;
  if (role !== UserRole.ADMIN && role !== UserRole.CEO) {
    const err = new AdminRequiredError();
    return res.status(err.code).json(err);
  }
  next();
}
