import { FetchFranchiseData } from '../../../src/application/usecases/FetchFranchiseData';

describe('FetchFranchiseData', () => {
  const mockAdapter = {
    fetch: jest.fn(),
  };

  const mockLogRepository = {
    save: jest.fn(),
  };

  it('should fetch data and log it', async () => {
    const mockData = { name: 'pikachu', weight: 60, powers: ['static'], evolutions: ['pichu', 'pikachu', 'raichu'] };
    mockAdapter.fetch.mockResolvedValue(mockData);

    const useCase = new FetchFranchiseData(mockAdapter, mockLogRepository);

    const result = await useCase.execute({
      franchise: 'pokemon',
      version: 'v1',
      metadata: { name: 'pikachu' },
      config: { baseUrl: 'https://pokeapi.co/api/v2' },
    });

    expect(result).toEqual(mockData);
    expect(mockAdapter.fetch).toHaveBeenCalledWith(
      { name: 'pikachu' },
      { baseUrl: 'https://pokeapi.co/api/v2' }
    );
    expect(mockLogRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      franchise: 'pokemon',
      version: 'v1',
      metadata: { name: 'pikachu' },
      status: 'success',
      errorMessage: null,
      timestamp: expect.any(String),
    }));
  });

  it('should throw if fetch fails', async () => {
    mockAdapter.fetch.mockRejectedValue(new Error('API error'));

    const useCase = new FetchFranchiseData(mockAdapter, mockLogRepository);

    await expect(
      useCase.execute({
        franchise: 'pokemon',
        version: 'v1',
        metadata: { name: 'pikachu' },
        config: { baseUrl: 'https://pokeapi.co/api/v2' },
      })
    ).rejects.toThrow('API error');
  });
});