import type { ApiClient } from '@/core/network/api-client';
import type {
  MovieDetailsResponse,
  MovieImagesResponse,
  MovieSearchResponse,
  MovieVideosResponse,
  UpcomingMovieResponse,
} from '@/data/models/movie-responses';

type UpcomingMoviesOptions = {
  language?: string;
  page?: number;
};

export class MovieRemoteDataSource {
  constructor(
    private readonly apiClient: ApiClient,
    private readonly apiKey: string,
  ) {}

  getUpcomingMovies(options: UpcomingMoviesOptions = {}): Promise<UpcomingMovieResponse> {
    return this.apiClient.get('/movie/upcoming', {
      api_key: this.apiKey,
      language: options.language,
      page: options.page,
    });
  }

  getMovieDetails(movieId: string): Promise<MovieDetailsResponse> {
    return this.apiClient.get(`/movie/${movieId}`, { api_key: this.apiKey });
  }

  getMovieImages(movieId: string): Promise<MovieImagesResponse> {
    return this.apiClient.get(`/movie/${movieId}/images`, { api_key: this.apiKey });
  }

  getMovieVideos(movieId: string): Promise<MovieVideosResponse> {
    return this.apiClient.get(`/movie/${movieId}/videos`, { api_key: this.apiKey });
  }

  searchMovies(query: string): Promise<MovieSearchResponse> {
    return this.apiClient.get('/search/movie', {
      api_key: this.apiKey,
      include_adult: false,
      language: 'en-US',
      query,
    });
  }
}
