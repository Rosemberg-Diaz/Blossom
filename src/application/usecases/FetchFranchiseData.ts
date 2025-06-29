import { ApiAdapter } from '../../ports/ApiAdapter';
import { LogRepository } from '../../ports/LogRepository';

interface FetchFranchiseDataInput {
  franchise: string;
  version: string;
  metadata: any;
  config: any;
}

export class FetchFranchiseData {
  constructor(
    private apiAdapter: ApiAdapter,
    private logRepository: LogRepository
  ) {}

  async execute(input: FetchFranchiseDataInput) {
    const { franchise, version, metadata, config } = input;
    const timestamp = new Date().toISOString();

    if (!metadata?.name) {
      throw new Error('Missing metadata.name');
    }

    if (!config?.baseUrl) {
      throw new Error('Missing config.baseUrl');
    }

    try {
      const data = await this.apiAdapter.fetch(metadata, config);

      await this.logRepository.save({
        franchise,
        version,
        metadata,
        timestamp,
        status: 'success',
        errorMessage: null,
      });

      return data;
    } catch (error: any) {
      await this.logRepository.save({
        franchise,
        version,
        metadata,
        timestamp,
        status: 'fail',
        errorMessage: error.message,
      });

      throw new Error(`Failed to fetch ${franchise} data: ${error.message}`);
    }
  }
}
