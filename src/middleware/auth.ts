import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/users";
import { InvalidTokenError, MissingTokenError } from "../errors";

export interface JwtRequest extends Request {
  user: string | JwtPayload;
}

export interface CurrentUser {
  id: number;
  username: string;
  role: UserRole;
}

export function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  var token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    const err = new MissingTokenError();
    return res.status(err.code).send(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY!);
    (req as JwtRequest).user = decoded;
    next();
  } catch (error) {
    console.log(error);
    const err = new InvalidTokenError();
    return res.status(err.code).send(err);
  }
}
