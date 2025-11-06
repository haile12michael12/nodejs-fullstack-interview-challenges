export interface ICacheKeyGenerator {
  generateKey(prefix: string, ...params: (string | number)[]): string;
  parseKey(key: string): { prefix: string; params: string[] };
}