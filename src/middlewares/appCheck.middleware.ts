import { Request, Response, NextFunction } from "express";

export function appCheckMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const appCheckToken = req.headers["x-app-check"];

  if (!appCheckToken) {
    return res.status(403).json({ message: "App Check failed" });
  }

  next();
}
