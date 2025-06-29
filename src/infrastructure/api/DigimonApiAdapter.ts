import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ApiAdapter } from '../../ports/ApiAdapter';

export class DigimonApiAdapter implements ApiAdapter {
  private http;

  constructor() {
    this.http = axios.create();

    axiosRetry(this.http, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        const status = error.response?.status;
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (typeof status === 'number' && status >= 500)
        );
      },
    });
  }

  async fetch(metadata: any, config: any) {
    const { id } = metadata;
    const { baseUrl } = config;

    if (!id || !baseUrl) {
      throw new Error('Missing id or baseUrl for Digimon API');
    }

    try {
      const response = await this.http.get(`${baseUrl}/digimon/${id}`);
      const digimon = response.data;

      return {
        name: digimon.name,
        powers: digimon.skills?.map((s: any) => s.skill) || [],
        evolutions: digimon.evolutions?.map((e: any) => e.digimon) || [],
      };
    } catch (error: any) {
      throw new Error(`Error fetching Digimon data: ${error.message}`);
    }
  }
}
