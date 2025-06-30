import { ApiAdapter } from '../../ports/ApiAdapter';
import { LogRepository } from '../../ports/LogRepository';
import { FetchFranchiseDataInput } from '../../domain/models/FranchiseDataInput';

/**
 * Caso de uso que obtiene datos de una franquicia usando un adaptador externo
 * y registra la operación en un repositorio de logs.
 */
export class FetchFranchiseData {
  /**
   * @param apiAdapter Adaptador que implementa la lógica para obtener los datos de la API externa.
   * @param logRepository Repositorio encargado de guardar los logs de las peticiones.
   */
  constructor(
    private apiAdapter: ApiAdapter,
    private logRepository: LogRepository
  ) {}

  /**
   * Ejecuta el caso de uso: obtiene datos desde la franquicia (API externa) y guarda un log del resultado.
   *
   * @param input Objeto con la franquicia, versión, metadata y configuración de la petición.
   * @returns Los datos obtenidos desde la API correspondiente.
   * @throws Error si faltan datos requeridos o si ocurre un fallo en la llamada a la API.
   */
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
