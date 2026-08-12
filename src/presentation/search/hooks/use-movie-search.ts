import { useCallback, useEffect, useRef, useState } from 'react';

import { createMovieServices } from '@/data/create-movie-services';
import type { Movie } from '@/domain/entities/movie';

type MovieSearchState = {
  clear: () => void;
  error: boolean;
  isLoading: boolean;
  query: string;
  results: readonly Movie[];
  retry: () => void;
  setQuery: (query: string) => void;
};

export function useMovieSearch(): MovieSearchState {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<readonly Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const requestVersion = useRef(0);

  const search = useCallback(async (searchQuery: string) => {
    const normalizedQuery = searchQuery.trim();
    const version = ++requestVersion.current;

    if (!normalizedQuery) {
      setResults([]);
      setError(false);
      setIsLoading(false);
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      const { searchMovies } = createMovieServices();
      const movies = await searchMovies(normalizedQuery);

      if (version === requestVersion.current) {
        setResults(movies);
      }
    } catch {
      if (version === requestVersion.current) {
        setResults([]);
        setError(true);
      }
    } finally {
      if (version === requestVersion.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const requestId = setTimeout(() => {
      void search(query);
    }, 350);

    return () => clearTimeout(requestId);
  }, [query, search]);

  const clear = useCallback(() => setQuery(''), []);
  const retry = useCallback(() => void search(query), [query, search]);

  return { clear, error, isLoading, query, results, retry, setQuery };
}
