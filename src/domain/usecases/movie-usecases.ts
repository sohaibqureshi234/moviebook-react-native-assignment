import type { Movie, MovieDetails, MovieImages, MovieTrailer } from '@/domain/entities/movie';
import type { MovieRepository } from '@/domain/repositories/movie-repository';

export type GetUpcomingMovies = () => Promise<readonly Movie[]>;
export type GetMovieDetails = (id: string) => Promise<MovieDetails>;
export type GetMovieImages = (id: string) => Promise<MovieImages>;
export type GetMovieTrailer = (id: string) => Promise<MovieTrailer | null>;
export type SearchMovies = (query: string) => Promise<readonly Movie[]>;

export function createGetUpcomingMovies(repository: MovieRepository): GetUpcomingMovies {
  return () => repository.getUpcomingMovies();
}

export function createGetMovieDetails(repository: MovieRepository): GetMovieDetails {
  return (id) => repository.getMovieDetails(id);
}

export function createGetMovieImages(repository: MovieRepository): GetMovieImages {
  return (id) => repository.getMovieImages(id);
}

export function createGetMovieTrailer(repository: MovieRepository): GetMovieTrailer {
  return (id) => repository.getMovieTrailer(id);
}

export function createSearchMovies(repository: MovieRepository): SearchMovies {
  return (query) => repository.searchMovies(query);
}
