import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { GOOGLE_API_KEY } from '../config/gemini';
import { Agent } from './types';

export class ResearchAgent implements Agent {
  name = 'research';
  description = 'Performs research and gathers information';

  async execute(query: string): Promise<string> {
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      apiKey: GOOGLE_API_KEY
    });

    const response = await model.invoke([
      new HumanMessage(`Research the following topic and provide detailed information: ${query}`)
    ]);

    return response.content.toString();
  }

  canHandle(task: string): boolean {
    return task.toLowerCase().includes('research') || 
           task.toLowerCase().includes('find information');
  }
}