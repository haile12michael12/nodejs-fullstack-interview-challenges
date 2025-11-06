export interface ICacheStrategy {
  getKey(...parts: string[]): string;
  shouldCache(key: string, value: any): boolean;
  getTTL(key: string): number;
}