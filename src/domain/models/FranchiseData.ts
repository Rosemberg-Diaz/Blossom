/**
 * Modelo de dominio que representa la información estructurada de una franquicia.
 */
export interface FranchiseData {
  name: string;
  weight?: number; // No todos los digimons tienen peso
  powers: string[];
  evolutions: string[];
}