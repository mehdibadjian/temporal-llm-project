export class ApplicationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ApplicationError';
    }
  }
  
  export class WorkflowError extends ApplicationError {
    constructor(message: string) {
      super(message);
      this.name = 'WorkflowError';
    }
  }
  
  export class ActivityError extends ApplicationError {
    constructor(message: string) {
      super(message);
      this.name = 'ActivityError';
    }
  }