import { Worker } from '@temporalio/worker';
import * as activities from './activities/llmActivities';
import { LLM_TASK_QUEUE } from './shared/constants';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: LLM_TASK_QUEUE,
  });

  console.log('Worker started. Press Ctrl+C to exit.');
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
