export type Movie = {
  id: string;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  genreIds: readonly number[];
  voteAverage: number;
};

export type MovieDetails = Movie & {
  genres: readonly MovieGenre[];
  runtimeMinutes: number | null;
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieImage = {
  filePath: string;
  width: number;
  height: number;
  aspectRatio: number;
};

export type MovieImages = {
  backdrops: readonly MovieImage[];
  logos: readonly MovieImage[];
  posters: readonly MovieImage[];
};

export type MovieTrailer = {
  videoKey: string;
  name: string;
  isOfficial: boolean;
};
