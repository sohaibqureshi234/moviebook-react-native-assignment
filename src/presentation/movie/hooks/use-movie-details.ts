import { useCallback, useEffect, useState } from 'react';

import { createMovieServices } from '@/data/create-movie-services';
import type { MovieDetails, MovieTrailer } from '@/domain/entities/movie';

type MovieDetailsState = {
  details: MovieDetails | null;
  error: boolean;
  isLoading: boolean;
  retry: () => void;
  trailer: MovieTrailer | null;
};

export function useMovieDetails(movieId: string): MovieDetailsState {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<MovieTrailer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMovie = useCallback(async () => {
    if (!movieId) {
      setDetails(null);
      setError(true);
      setIsLoading(false);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      const { getMovieDetails, getMovieTrailer } = createMovieServices();
      const [movieDetails, movieTrailer] = await Promise.all([
        getMovieDetails(movieId),
        getMovieTrailer(movieId),
      ]);

      setDetails(movieDetails);
      setTrailer(movieTrailer);
    } catch {
      setDetails(null);
      setTrailer(null);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    const requestId = setTimeout(() => {
      void loadMovie();
    }, 0);

    return () => clearTimeout(requestId);
  }, [loadMovie]);

  return { details, error, isLoading, retry: loadMovie, trailer };
}
