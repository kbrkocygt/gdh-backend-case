import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/app-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  // Beklenen (business) hatalar
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message
    });
    return;
  }

  // Beklenmeyen hatalar
  console.error("UNEXPECTED ERROR:", err);

  res.status(500).json({
    message: "Internal server error"
  });
};
