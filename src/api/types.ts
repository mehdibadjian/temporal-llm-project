export interface ProcessRequest {
    prompt: string;
  }
  
  export interface ProcessResponse {
    result: string;
  }
  
  export interface ErrorResponse {
    error: string;
  }
  
  export interface HealthResponse {
    status: 'ok' | 'error';
  }