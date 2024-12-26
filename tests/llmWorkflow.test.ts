import { TestWorkflowEnvironment } from '@temporalio/testing';
import { Worker } from '@temporalio/worker';
import { llmWorkflow } from '../src/workflows/llmWorkflow';
import * as activities from '../src/activities/llmActivities';

describe('LLM Workflow', () => {
  let testEnv: TestWorkflowEnvironment;

  beforeAll(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal();
  });

  afterAll(async () => {
    await testEnv?.teardown();
  });

  it('should process LLM request', async () => {
    const { client, nativeConnection } = testEnv;
    
    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue: 'test-queue',
      workflowsPath: require.resolve('../src/workflows/llmWorkflow'),
      activities,
    });

    const result = await client.workflow.execute(llmWorkflow, {
      taskQueue: 'test-queue',
      args: [{
        prompt: 'Test prompt',
        model: 'test-model',
      }],
    });

    expect(result).toBeDefined();
    expect(result.model).toBe('test-model');
  });
});
