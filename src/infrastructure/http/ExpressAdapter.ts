import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PokemonApiAdapter } from '../api/PokemonApiAdapter';
import { DigimonApiAdapter } from '../api/DigimonApiAdapter';
import { InMemoryLogRepository } from '../db/InMemoryLogRepository';
import { FetchFranchiseData } from '../../application/usecases/FetchFranchiseData';

export function startServer() {
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());

  app.get('/api/:franchise/:version', async (req: Request, res: Response) => {
    const { franchise, version } = req.params;
    const { metadata, config } = req.query;

    if (!metadata || !config) {
      return res.status(400).json({ error: 'Missing metadata or config parameter' });
    }

    let parsedMetadata, parsedConfig;
    try {
      parsedMetadata = JSON.parse(metadata as string);
      parsedConfig = JSON.parse(config as string);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON format in metadata or config' });
    }

    let apiAdapter;
    if (franchise === 'pokemon') {
      apiAdapter = new PokemonApiAdapter();
    } else if (franchise === 'digimon') {
      apiAdapter = new DigimonApiAdapter();
    } else {
      return res.status(400).json({ error: 'Invalid franchise. Use "pokemon" or "digimon".' });
    }

    const logRepository = new InMemoryLogRepository();
    const useCase = new FetchFranchiseData(apiAdapter, logRepository);

    try {
      const result = await useCase.execute({
        franchise,
        version,
        metadata: parsedMetadata,
        config: parsedConfig,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
}
