
import { FetchFranchiseData } from '../../../src/application/usecases/FetchFranchiseData';

describe('FetchFranchiseData - invalid inputs', () => {
  const mockAdapter = {
    fetch: jest.fn(),
  };

  const mockLogRepository = {
    save: jest.fn(),
  };

  it('should throw if metadata.name is missing', async () => {
    const useCase = new FetchFranchiseData(mockAdapter, mockLogRepository);

    await expect(useCase.execute({
      franchise: 'pokemon',
      version: 'v1',
      metadata: {}, // Missing name
      config: { baseUrl: 'https://pokeapi.co/api/v2' }
    })).rejects.toThrow();
  });

  it('should throw if config.baseUrl is missing', async () => {
    const useCase = new FetchFranchiseData(mockAdapter, mockLogRepository);

    await expect(useCase.execute({
      franchise: 'pokemon',
      version: 'v1',
      metadata: { name: 'pikachu' },
      config: {} // Missing baseUrl
    })).rejects.toThrow();
  });
});
