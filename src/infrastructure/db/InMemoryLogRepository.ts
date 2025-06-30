import { LogRepository } from '../../ports/LogRepository';

/**
 * Implementación en memoria del repositorio de logs.
 * Esta clase permite guardar, recuperar y limpiar registros de forma temporal,
 * sin persistencia en disco o base de datos.
 * Es especialmente útil durante pruebas o entornos de desarrollo.
 */
export class InMemoryLogRepository implements LogRepository {
  private logs: any[] = [];

  /**
   * Guarda un log en la memoria local.
   *
   * @param log Objeto que contiene los campos:
   *  - franchise: Nombre de la franquicia (por ejemplo, "pokemon" o "digimon")
   *  - version: Versión del endpoint o sistema
   *  - metadata: Datos de entrada relacionados con la petición
   *  - timestamp: Fecha y hora de ejecución
   *  - status: Estado de la operación ('success' o 'fail')
   *  - errorMessage: Mensaje de error si ocurrió algún fallo, o null si fue exitoso
   */
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

  /**
   * Devuelve todos los logs almacenados.
   * Método útil para propósitos de prueba o verificación en memoria.
   *
   * @returns Un arreglo con todos los logs registrados hasta el momento.
   */
  async getAll(): Promise<any[]> {
    return this.logs;
  }

  /**
   * Limpia todos los logs almacenados en memoria.
   * Especialmente útil para resetear el estado entre pruebas unitarias.
   */
  clear(): void {
    this.logs = [];
  }
}
