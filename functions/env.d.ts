/** Minimal KV typings for Pages Functions (wrangler bundles these files). */
interface KVNamespace {
  get(key: string, options?: { type?: 'text' }): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}
