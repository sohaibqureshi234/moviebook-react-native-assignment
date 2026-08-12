import { HttpError } from '@/core/errors/http-error';
import { NetworkError } from '@/core/errors/network-error';

export type QueryParams = Record<string, string | number | boolean | undefined>;

export type ApiClientOptions = {
  baseUrl: string;
  fetcher?: typeof fetch;
};

export class ApiClient {
  private readonly fetcher: typeof fetch;

  constructor(private readonly options: ApiClientOptions) {
    this.fetcher = options.fetcher ?? fetch;
  }

  async get<T>(path: string, query?: QueryParams): Promise<T> {
    let response: Response;

    try {
      response = await this.fetcher(this.createUrl(path, query));
    } catch (error) {
      throw new NetworkError('Network request failed.', error);
    }

    if (!response.ok) {
      throw new HttpError(response.status, `Request failed with status ${response.status}`);
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new HttpError(response.status, 'Response body is not valid JSON.');
    }
  }

  private createUrl(path: string, query?: QueryParams): string {
    const baseUrl = this.options.baseUrl.endsWith('/')
      ? this.options.baseUrl
      : `${this.options.baseUrl}/`;
    const url = new URL(path.replace(/^\//, ''), baseUrl);

    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    return url.toString();
  }
}
