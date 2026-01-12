import { AiToolStrategy } from "./ai-tool.strategy";
import { getWeather } from "../tools/weather.tool";

export class MockAiToolStrategy implements AiToolStrategy {
  enrich(prompt: string): string {
    const weatherInfo = getWeather();
    return `${prompt}\n${weatherInfo}`;
  }
}