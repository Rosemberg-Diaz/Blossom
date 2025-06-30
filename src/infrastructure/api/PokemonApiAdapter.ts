import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ApiAdapter } from '../../ports/ApiAdapter';
import { FranchiseData } from '../../domain/models/FranchiseData';

export class PokemonApiAdapter implements ApiAdapter {
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

  async fetch(metadata: any, config: any): Promise<FranchiseData> {
    const { name } = metadata;
    const { baseUrl } = config;

    if (!name || !baseUrl) {
      throw new Error('Missing name or baseUrl for Pokémon API');
    }

    try {
      const pokemonResponse = await this.http.get(`${baseUrl}/pokemon/${name}`);
      const pokemonData = pokemonResponse.data;

      const powers = pokemonData.abilities.map((a: any) => a.ability.name);
      const weight = pokemonData.weight;

      const speciesResponse = await this.http.get(`${baseUrl}/pokemon-species/${name}`);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      const evolutionResponse = await this.http.get(evolutionChainUrl);
      const evolutions = this.extractEvolutions(evolutionResponse.data.chain);

      return {
        name,
        weight,
        powers,
        evolutions,
      };
    } catch (error: any) {
      throw new Error(`Error fetching Pokémon data: ${error.message}`);
    }
  }

  private extractEvolutions(chain: any): string[] {
    const evolutions: string[] = [];
    let current = chain;
    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to?.[0];
    }
    return evolutions;
  }
}