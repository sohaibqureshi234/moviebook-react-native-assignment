import { tmdbConfig } from '@/core/constants/tmdb';
import { ConfigurationError } from '@/core/errors/configuration-error';
import { ApiClient } from '@/core/network/api-client';
import { MovieRemoteDataSource } from '@/data/datasources/remote/movie-remote-data-source';
import { MovieRepositoryImpl } from '@/data/repositories/movie-repository-impl';
import {
  createGetMovieDetails,
  createGetMovieImages,
  createGetMovieTrailer,
  createGetUpcomingMovies,
  createSearchMovies,
} from '@/domain/usecases/movie-usecases';

export function createMovieServices(apiKey = tmdbConfig.apiKey) {
  if (!apiKey) {
    throw new ConfigurationError('EXPO_PUBLIC_TMDB_API_KEY is required to use the TMDB data layer.');
  }

  const apiClient = new ApiClient({ baseUrl: tmdbConfig.baseUrl });
  const remoteDataSource = new MovieRemoteDataSource(apiClient, apiKey);
  const movieRepository = new MovieRepositoryImpl(remoteDataSource);

  return {
    getMovieDetails: createGetMovieDetails(movieRepository),
    getMovieImages: createGetMovieImages(movieRepository),
    getMovieTrailer: createGetMovieTrailer(movieRepository),
    getUpcomingMovies: createGetUpcomingMovies(movieRepository),
    searchMovies: createSearchMovies(movieRepository),
    movieRepository,
  };
}
