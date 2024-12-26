export interface OrchestrationResult {
    result: string;
    metadata?: {
      processingTime: number;
      tokensUsed?: number;
      modelName?: string;
    };
  }
  
  export interface OrchestrationError {
    message: string;
    code: string;
    details?: unknown;
  }