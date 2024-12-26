import express, { Request, Response } from 'express';
import { Connection, Client } from '@temporalio/client';
import { llmWorkflow } from '../workflows/llmWorkflow';
import { LLM_TASK_QUEUE } from '../shared/constants';
import { OrchestrationResult } from '../types/orchestration';

const app = express();
app.use(express.json());

app.post('/process', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    
    const connection = await Connection.connect();
    const client = new Client({ connection });

    const handle = await client.workflow.start(llmWorkflow, {
      args: [prompt],
      taskQueue: LLM_TASK_QUEUE,
      workflowId: `orchestration-${Date.now()}`,
    });

    const result = await handle.result();
    
    const response: OrchestrationResult = {
      result,
      metadata: {
        processingTime: Date.now() - Number(handle.workflowId.split('-')[1]),
        modelName: 'gemini-pro'
      }
    };

    res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export const startServer = (port: number): Promise<void> => {
  return new Promise((resolve) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve();
    });
  });
};