export class LLMError extends Error {
    constructor(message: string, public readonly code?: string) {
      super(message);
      this.name = 'LLMError';
    }
  }
  
  export class WorkflowError extends Error {
    constructor(message: string, public readonly code?: string) {
      super(message);
      this.name = 'WorkflowError';
    }
  }