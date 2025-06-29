import { LogRepository } from '../../ports/LogRepository';

export class InMemoryLogRepository implements LogRepository {
  private logs: any[] = [];

  async save(log: {
    franchise: string;
    version: string;
    metadata: any;
    timestamp: string;
    status: 'success' | 'fail';
    errorMessage: string | null;
  }): Promise<void> {
    this.logs.push(log);
    console.log('📝 Log guardado:', log);
  }

  // 👉 Método opcional para ver logs en pruebas
  async getAll(): Promise<any[]> {
    return this.logs;
  }

  // 👉 Método opcional para resetear logs si haces tests
  clear(): void {
    this.logs = [];
  }
}
