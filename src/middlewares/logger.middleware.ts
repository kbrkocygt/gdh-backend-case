import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(
    JSON.stringify({
      method: req.method,
      url: req.originalUrl,
      client: req.headers["client-type"],
      time: new Date().toISOString()
    })
  );

  next();
}
