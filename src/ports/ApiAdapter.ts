export interface ApiAdapter {
  fetch(metadata: any, config: any): Promise<{
    name: string;
    weight?: number;
    powers: string[];
    evolutions: string[];
  }>;
}
