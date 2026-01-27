import express from "express";
import cors from "cors";
import { appCheckMiddleware } from "./middlewares/appCheck.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { clientMiddleware } from "./middlewares/client.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import chatRouter from "./modules/chat/chat.routes";
import flagsRouter from "./modules/flags/flags.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

export const app = express();

app.use(cors());
app.use(express.json());

// Case requirement: route-specific middleware chain and strict order
app.use(
  "/api/chats",
  appCheckMiddleware,
  authMiddleware,
  clientMiddleware,
  loggerMiddleware,
  chatRouter
);

// Runtime feature flag management (helps demonstrate "no redeploy" behavior)
app.use(
  "/api/flags",
  appCheckMiddleware,
  authMiddleware,
  clientMiddleware,
  loggerMiddleware,
  flagsRouter
);
app.use(errorHandler);
