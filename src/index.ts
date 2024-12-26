import { Worker } from '@temporalio/worker';
import { Activities } from './activities/llmActivities';
import { OrchestrationActivities } from './orchestrator/orchestrationActivities';
import { LLM_TASK_QUEUE } from './shared/constants';
import { startServer } from './api/server';

export async function run(): Promise<void> {
  console.log('Starting application...');
  
  try {
    // Create and run Temporal worker
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows'),
      activities: {
        ...Activities,
        ...OrchestrationActivities,
      },
      taskQueue: LLM_TASK_QUEUE,
    });

    // Start the worker
    await Promise.all([
      worker.run(),
      startServer(3000)
    ]);

    console.log('Application started successfully');
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Only run if this file is being run directly
if (require.main === module) {
  run().catch((error: Error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}