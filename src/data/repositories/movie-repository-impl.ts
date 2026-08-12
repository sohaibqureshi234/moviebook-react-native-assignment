import type { Movie, MovieDetails, MovieImages, MovieTrailer } from '@/domain/entities/movie';
import { InvalidResponseError } from '@/core/errors/invalid-response-error';
import type { MovieRepository } from '@/domain/repositories/movie-repository';

import { MovieRemoteDataSource } from '@/data/datasources/remote/movie-remote-data-source';
import {
  mapMovieDetails,
  mapMovieImages,
  mapMovieSummary,
  selectMovieTrailer,
} from '@/data/models/movie-mapper';

export class MovieRepositoryImpl implements MovieRepository {
  constructor(private readonly remoteDataSource: MovieRemoteDataSource) {}

  async getUpcomingMovies(): Promise<readonly Movie[]> {
    const response = await this.remoteDataSource.getUpcomingMovies();

    if (!Array.isArray(response.results)) {
      throw new InvalidResponseError('TMDB response is missing a valid results array.');
    }

    return response.results.map(mapMovieSummary);
  }

  async getMovieDetails(id: string): Promise<MovieDetails> {
    return mapMovieDetails(await this.remoteDataSource.getMovieDetails(id));
  }

  async getMovieImages(id: string): Promise<MovieImages> {
    return mapMovieImages(await this.remoteDataSource.getMovieImages(id));
  }

  async getMovieTrailer(id: string): Promise<MovieTrailer | null> {
    return selectMovieTrailer(await this.remoteDataSource.getMovieVideos(id));
  }

  async searchMovies(query: string): Promise<readonly Movie[]> {
    const response = await this.remoteDataSource.searchMovies(query);

    if (!Array.isArray(response.results)) {
      throw new InvalidResponseError('TMDB response is missing a valid results array.');
    }

    return response.results.map(mapMovieSummary);
  }
}
