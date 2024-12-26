import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { GOOGLE_API_KEY } from '../config/gemini';
import { Agent } from './types';

export class WritingAgent implements Agent {
  name = 'writer';
  description = 'Composes coherent text from multiple inputs';

  async execute(inputs: string[]): Promise<string> {
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      apiKey: GOOGLE_API_KEY
    });

    const prompt = `
    Compose a coherent response using the following information:
    ${inputs.join('\n\n')}
    
    Make it sound natural and well-organized.`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    return response.content.toString();
  }

  canHandle(task: string): boolean {
    return task.toLowerCase().includes('write') || 
           task.toLowerCase().includes('compose') ||
           task.toLowerCase().includes('summarize');
  }
}