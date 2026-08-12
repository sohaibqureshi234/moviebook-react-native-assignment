import type { Movie, MovieDetails, MovieImages, MovieTrailer } from '@/domain/entities/movie';

export interface MovieRepository {
  getUpcomingMovies(): Promise<readonly Movie[]>;
  getMovieDetails(id: string): Promise<MovieDetails>;
  getMovieImages(id: string): Promise<MovieImages>;
  getMovieTrailer(id: string): Promise<MovieTrailer | null>;
  searchMovies(query: string): Promise<readonly Movie[]>;
}
