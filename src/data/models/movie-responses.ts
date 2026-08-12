export type TmdbMovieSummary = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
};

export type UpcomingMovieResponse = {
  page: number;
  results: TmdbMovieSummary[];
  total_pages: number;
  total_results: number;
};

export type MovieSearchResponse = {
  page: number;
  results: TmdbMovieSummary[];
  total_pages: number;
  total_results: number;
};

export type TmdbGenre = {
  id: number;
  name: string;
};

export type MovieDetailsResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genres: TmdbGenre[];
  runtime: number | null;
  vote_average: number;
};

export type TmdbImage = {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
};

export type MovieImagesResponse = {
  backdrops: TmdbImage[];
  logos: TmdbImage[];
  posters: TmdbImage[];
};

export type TmdbVideo = {
  key: string;
  name: string;
  official: boolean;
  site: string;
  type: string;
};

export type MovieVideosResponse = {
  results: TmdbVideo[];
};
