import express from 'express';
import { Connection, Client } from '@temporalio/client';
import { startLLMWorkflow } from '../workflows/llmWorkflow';
import { LLM_TASK_QUEUE } from '../shared/constants';

export async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  app.get('/health', (req, res) => {
    console.log('Health check endpoint called');
    res.json({ status: 'ok' });
  });

  app.post('/generate', async (req, res) => {
    try {
      console.log('Received generation request:', req.body);
      
      const connection = await Connection.connect({
        address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
      });

      const client = new Client({ connection });

      const { prompt, temperature, maxTokens } = req.body;
      
      const handle = await client.workflow.start(startLLMWorkflow, {
        args: [{ prompt, temperature, maxTokens }],
        taskQueue: LLM_TASK_QUEUE,
        workflowId: `gemini-workflow-${Date.now()}`,
      });

      console.log('Workflow started with ID:', handle.workflowId);
      
      // Wait for the result
      const result = await handle.result();
      res.json({ 
        workflowId: handle.workflowId,
        result 
      });
    } catch (error) {
      console.error('Error in generation:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  app.get('/workflow/status/:workflowId', async (req, res) => {
    try {
      console.log('Checking status for workflow:', req.params.workflowId);
      
      const connection = await Connection.connect({
        address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
      });

      const client = new Client({ connection });
      const handle = client.workflow.getHandle(req.params.workflowId);
      const status = await handle.describe();
      
      res.json({ status });
    } catch (error) {
      console.error('Error checking workflow status:', error);
      res.status(500).json({ error: 'Failed to get workflow status' });
    }
  });

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve(server);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
    });
  });
}