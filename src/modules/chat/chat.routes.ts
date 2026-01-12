import { Router } from "express";
import {
  getChats,
  getChatHistory,
  completeChat,
} from "./chat.controller";

const router = Router();

router.get("/", getChats);
router.get("/:chatId/history", getChatHistory);
router.post("/:chatId/completion", completeChat);

export default router;
