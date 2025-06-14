import { Request, Response, NextFunction } from "express";
import { InvalidPaginationRequestError } from "../errors";

export interface PaginationRequest extends Request {
  pagination: PaginationPayload;
}

export interface PaginationPayload {
  offset?: number;
  limit?: number;
}

export function pagination(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const page = req.query.page;
  const size = req.query.size;

  // If both params are provided but either of them is not a number
  if (page !== undefined && size !== undefined) {
    if (isNaN(Number(page)) || isNaN(Number(size))) {
      const error = new InvalidPaginationRequestError();
      return res.status(error.code).json(error);
    }
  }
  // If only one the params are null
  else if (page !== undefined || size !== undefined) {
    const error = new InvalidPaginationRequestError();
    return res.status(error.code).json(error);
  }

  const offset = page === undefined ? undefined : Number(page) * Number(size);
  const limit = size === undefined ? undefined : Number(size);

  (req as PaginationRequest).pagination = { offset: offset, limit: limit };
  next();
}
