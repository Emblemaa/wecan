import { Request, Response, NextFunction } from "express";
import path from "path";
import { EmptyFileError, InvalidImageFormatError } from "../errors";

export function imageValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const image = req.file;
  if (!image) {
    const error = new EmptyFileError();
    return res.status(error.code).json(error);
  }

  const magicNumbers = [];

  var extension = path
    .extname(image.originalname)
    .replace(".", "")
    .toLowerCase();

  if (extension == "png") {
    magicNumbers.push(0x89, 0x50, 0x4e, 0x47);
  } else if (extension == "jpeg" || extension == "jpg") {
    magicNumbers.push(0xff, 0xd8);
  } else {
    const error = new InvalidImageFormatError();
    return res.status(error.code).json(error);
  }

  console.log(magicNumbers);

  for (let i = 0; i < magicNumbers.length; i++) {
    if (image.buffer[i] != magicNumbers[i]) {
      const error = new InvalidImageFormatError();
      return res.status(error.code).json(error);
    }
  }
  next();
}
