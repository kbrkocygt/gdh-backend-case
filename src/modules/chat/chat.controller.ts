import { Request, Response } from "express";
import { chatService } from "../../container";
import { asyncHandler } from "../../common/utils/async-handler";

export const getChats = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const chats = await chatService.getChats();
    res.status(200).json(chats);
  }
);

export const getChatHistory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const chatId = Number(req.params.chatId);
    if (Number.isNaN(chatId)) {
      res.status(400).json({ message: "Invalid chatId" });
      return;
    }
    const messages = await chatService.getChatHistory(chatId);
    res.status(200).json(messages);
  }
);

export const completeChat = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const chatId = Number(req.params.chatId);
    if (Number.isNaN(chatId)) {
      res.status(400).json({ message: "Invalid chatId" });
      return;
    }
    const prompt = (req.body?.prompt as string) ?? "";
    await chatService.completeChat(chatId, prompt, res);
  }
);

