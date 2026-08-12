import { useCallback, useEffect, useState } from 'react';

import { createMovieServices } from '@/data/create-movie-services';
import type { MovieTrailer } from '@/domain/entities/movie';

type MovieTrailerState = {
  error: boolean;
  isLoading: boolean;
  retry: () => void;
  trailer: MovieTrailer | null;
};

export function useMovieTrailer(movieId: string): MovieTrailerState {
  const [trailer, setTrailer] = useState<MovieTrailer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadTrailer = useCallback(async () => {
    if (!movieId) {
      setTrailer(null);
      setError(true);
      setIsLoading(false);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      const { getMovieTrailer } = createMovieServices();
      setTrailer(await getMovieTrailer(movieId));
    } catch {
      setTrailer(null);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    const requestId = setTimeout(() => {
      void loadTrailer();
    }, 0);

    return () => clearTimeout(requestId);
  }, [loadTrailer]);

  return { error, isLoading, retry: loadTrailer, trailer };
}
