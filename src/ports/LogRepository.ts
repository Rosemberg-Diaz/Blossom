export interface LogRepository {
  save(log: {
    franchise: string;
    version: string;
    metadata: any;
    timestamp: string;
    status: 'success' | 'fail';
    errorMessage: string | null;
  }): Promise<void>;
}
