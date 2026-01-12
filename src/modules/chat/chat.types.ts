export interface Chat {
  id: number;
  title: string;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  content: string;
  
}
