import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ApiAdapter } from '../../ports/ApiAdapter';
import { FranchiseData } from '../../domain/models/FranchiseData';

/**
 * Adaptador para conectarse a la API de Digimon y extraer datos específicos.
 * Implementa la interfaz ApiAdapter del dominio.
 */
export class DigimonApiAdapter implements ApiAdapter {
  private http;

  constructor() {
    this.http = axios.create();

    // Retry automático en caso de errores de red o respuestas 5xx
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

  /**
   * Método para obtener información de un Digimon específico desde la API.
   *
   * @param metadata - Contiene el nombre del Digimon a buscar (ej. { name: "agumon" }).
   * @param config - Contiene configuraciones como la `baseUrl` de la API.
   * @returns Promesa que resuelve con un objeto FranchiseData con nombre, poderes y evoluciones.
   * @throws Error si falla la petición HTTP o los datos están mal formados.
   */
  async fetch(metadata: any, config: any): Promise<FranchiseData> {
    const { name } = metadata;
    const { baseUrl } = config;

    if (!name || !baseUrl) {
      throw new Error('Missing name or baseUrl for Digimon API');
    }

    try {
      const response = await this.http.get(`${baseUrl}/digimon/${name}`);
      const digimon = response.data;

      return {
        name: digimon.name,
        powers: digimon.skills?.map((s: any) => s.skill) || [],
        evolutions: [
          ...(digimon.priorEvolutions?.map((e: any) => e.digimon) || []),
          ...(digimon.nextEvolutions?.map((e: any) => e.digimon) || []),
        ],

      };
    } catch (error: any) {
      throw new Error(`Error fetching Digimon data: ${error.message}`);
    }
  }
}
