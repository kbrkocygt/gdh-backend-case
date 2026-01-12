import express from "express";
import cors from "cors";
import { appCheckMiddleware } from "./middlewares/appCheck.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";
import { clientMiddleware } from "./middlewares/client.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import chatRouter from "./modules/chat/chat.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";

export const app = express();

app.use(cors());
app.use(express.json());

app.use(appCheckMiddleware);
app.use(authMiddleware);
app.use(clientMiddleware);
app.use(loggerMiddleware);
app.use("/api/chats", chatRouter);
app.use(errorHandler);
