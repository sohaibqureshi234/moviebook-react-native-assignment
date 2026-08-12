import { useCallback, useEffect, useState } from 'react';

import { createMovieServices } from '@/data/create-movie-services';
import type { MovieDetails } from '@/domain/entities/movie';

export function useBookingMovie(movieId: string) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  const loadMovie = useCallback(async () => {
    if (!movieId) {
      setMovie(null);
      return;
    }

    try {
      const { getMovieDetails } = createMovieServices();
      setMovie(await getMovieDetails(movieId));
    } catch {
      setMovie(null);
    }
  }, [movieId]);

  useEffect(() => {
    const requestId = setTimeout(() => {
      void loadMovie();
    }, 0);

    return () => clearTimeout(requestId);
  }, [loadMovie]);

  return movie;
}
