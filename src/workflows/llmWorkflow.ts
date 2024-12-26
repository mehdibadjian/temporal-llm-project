import { proxyActivities } from '@temporalio/workflow';
import type { Activities } from '../activities/llmActivities';
import type { OrchestrationActivities } from '../orchestrator/orchestrationActivities';

const activities = proxyActivities<
  typeof Activities & typeof OrchestrationActivities
>({
  startToCloseTimeout: '10 minutes',
  retry: {
    maximumAttempts: 3,
  },
});

export async function llmWorkflow(request: string): Promise<string> {
  try {
    // Use the orchestration activity
    return await activities.orchestrateRequest(request);
  } catch (error) {
    console.error('Workflow error:', error);
    throw error;
  }
}