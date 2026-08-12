import { useCallback, useEffect, useState } from 'react';

import { createMovieServices } from '@/data/create-movie-services';
import type { Movie } from '@/domain/entities/movie';

type UpcomingMoviesState = {
  error: boolean;
  isLoading: boolean;
  movies: readonly Movie[];
  retry: () => void;
};

export function useUpcomingMovies(): UpcomingMoviesState {
  const [movies, setMovies] = useState<readonly Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMovies = useCallback(async () => {
    setError(false);
    setIsLoading(true);

    try {
      const { getUpcomingMovies } = createMovieServices();
      setMovies(await getUpcomingMovies());
    } catch {
      setMovies([]);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const requestId = setTimeout(() => {
      void loadMovies();
    }, 0);

    return () => clearTimeout(requestId);
  }, [loadMovies]);

  return { error, isLoading, movies, retry: loadMovies };
}
