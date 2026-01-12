export interface AiToolStrategy {
  enrich(prompt: string): string;
}
