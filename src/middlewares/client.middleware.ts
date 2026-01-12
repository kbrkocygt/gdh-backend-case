import { Request, Response, NextFunction } from "express";

export function clientMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientType = req.headers["x-client-type"] || "unknown";

  req.headers["client-type"] = clientType as string;

  next();
}
