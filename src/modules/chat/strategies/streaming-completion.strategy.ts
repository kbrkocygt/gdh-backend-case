import { Response } from "express";
import { CompletionStrategy } from "./completion.strategy";

export class StreamingCompletionStrategy implements CompletionStrategy {
  async execute(
    res: Response<any, Record<string, any>>,
    prompt: string
  ): Promise<void> {
    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders?.();


    const words = prompt.split(" ");

    for (const word of words) {
      res.write(`data: ${word}\n\n`);
      await this.delay(300);
    }
    // for (const char of prompt) {
    //   res.write(`data: ${char}\n\n`);
    //   await new Promise(r => setTimeout(r, 100));
    // }

    res.write(`data: [DONE]\n\n`);
    res.end();
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
