import dotenv from 'dotenv';
import path from 'path';
import { Worker, NativeConnection } from '@temporalio/worker';
import { Activities } from './activities/llmActivities';
import { LLM_TASK_QUEUE } from './shared/constants';
import { startServer } from './api/server';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  try {
    // Add retry logic for connecting to Temporal
    let connection;
    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      try {
        connection = await NativeConnection.connect({
          address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
          // Remove TLS configuration since we're not using it
        });
        console.log('Successfully connected to Temporal');
        break;
      } catch (error) {
        retries++;
        console.log(`Failed to connect to Temporal. Retry ${retries}/${maxRetries}`);
        if (retries === maxRetries) throw error;
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    if (!connection) {
      throw new Error('Failed to establish connection to Temporal server');
    }

    // Start the Temporal Worker
    const worker = await Worker.create({
      connection,
      namespace: 'default',
      taskQueue: LLM_TASK_QUEUE,
      workflowsPath: require.resolve('./workflows/llmWorkflow'),
      activities: Activities,
    });

    console.log('Starting worker and API server...');

    // Start both the worker and API server
    await Promise.all([
      worker.run(),
      startServer()
    ]);

    console.log('Worker and API server started successfully');
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Application startup failed';
    console.error(errorMessage);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  process.exit(0);
});

// Start the application
main().catch((error: unknown) => {
  console.error('Fatal error:', error);
  process.exit(1);
});