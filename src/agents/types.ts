export interface Agent {
    name: string;
    description: string;
    execute(input: any): Promise<any>;
    canHandle(task: string): boolean;
  }
  
  export interface TaskBreakdown {
    mainTask: string;
    subTasks: SubTask[];
  }
  
  export interface SubTask {
    id: string;
    description: string;
    requiredAgent: string;
    dependencies?: string[];
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
    result?: any;
  }