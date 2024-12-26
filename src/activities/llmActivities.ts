import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { GOOGLE_API_KEY } from '../config/gemini';

export interface LLMRequest {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export const Activities = {
  async generateResponse(request: LLMRequest): Promise<string> {
    try {
      console.log('Starting LLM generation with request:', request);

      if (!GOOGLE_API_KEY) {
        throw new Error('Google API key is not available');
      }

      const model = new ChatGoogleGenerativeAI({
        modelName: "gemini-pro",
        maxOutputTokens: request.maxTokens || 1024,
        temperature: request.temperature || 0.7,
        apiKey: GOOGLE_API_KEY
      });

      const response = await model.invoke([
        new HumanMessage(request.prompt),
      ]);

      console.log('LLM generation completed');
      return response.content.toString();
    } catch (error) {
      console.error('Error in LLM generation:', error);
      throw error;
    }
  }
};