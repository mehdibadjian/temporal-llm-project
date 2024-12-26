import { LLMOrchestrator } from '../orchestrator/orchestrator';

export const OrchestrationActivities = {
  async orchestrateRequest(request: string): Promise<string> {
    try {
      const orchestrator = new LLMOrchestrator();
      return await orchestrator.orchestrate(request);
    } catch (error) {
      console.error('Orchestration error:', error);
      throw error;
    }
  }
};