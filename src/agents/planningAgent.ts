import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { GOOGLE_API_KEY } from '../config/gemini';
import { Agent, TaskBreakdown } from './types';

export class PlanningAgent implements Agent {
  name = 'planner';
  description = 'Breaks down complex tasks into subtasks';

  async execute(task: string): Promise<TaskBreakdown> {
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-pro",
      apiKey: GOOGLE_API_KEY
    });

    const prompt = `
    Break down the following task into smaller subtasks:
    Task: ${task}
    
    Respond in JSON format:
    {
      "mainTask": "task description",
      "subTasks": [
        {
          "id": "unique_id",
          "description": "subtask description",
          "requiredAgent": "agent_type",
          "dependencies": ["dependent_task_ids"]
        }
      ]
    }`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    const content = response.content.toString();
    return JSON.parse(content) as TaskBreakdown;
  }

  canHandle(task: string): boolean {
    console.log(task)
    return true;
  }
}