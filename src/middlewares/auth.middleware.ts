import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // Basitleştirilmiş (mock) JWT kontrolü
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Token şu an kullanılmıyor, sadece varlığı kontrol ediliyor
  // Gerçek JWT implementasyonunda burada verify işlemi yapılır
  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}