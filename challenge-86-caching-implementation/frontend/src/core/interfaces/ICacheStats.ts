export interface ICacheStats {
  provider: string;
  hits: number;
  misses: number;
  hitRate: number;
  keys: number;
  maxSize: number;
  timestamp: string;
}