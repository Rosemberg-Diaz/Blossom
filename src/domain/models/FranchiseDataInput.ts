/**
 * Interface que define los datos de entrada para el caso de uso FetchFranchiseData.
 */
export interface FetchFranchiseDataInput {
  franchise: string;   // Nombre de la franquicia (por ejemplo, "pokemon" o "digimon")
  version: string;     // Versión del endpoint o servicio
  metadata: any;       // Datos necesarios para realizar la consulta (debe incluir "name")
  config: any;         // Configuración adicional, como la baseUrl
}