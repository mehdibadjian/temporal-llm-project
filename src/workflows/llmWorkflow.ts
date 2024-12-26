import * as wf from '@temporalio/workflow';
import type { LLMRequest } from '../activities/llmActivities';

const { generateResponse } = wf.proxyActivities<typeof import('../activities/llmActivities').Activities>({
  startToCloseTimeout: '10 minutes',
  retry: {
    maximumAttempts: 3,
    initialInterval: '1 second',
  },
});

export async function startLLMWorkflow(request: LLMRequest): Promise<string> {
  return await generateResponse(request);
}