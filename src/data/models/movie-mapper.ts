import { InvalidResponseError } from '@/core/errors/invalid-response-error';
import type {
  Movie,
  MovieDetails,
  MovieGenre,
  MovieImage,
  MovieImages,
  MovieTrailer,
} from '@/domain/entities/movie';

import type {
  MovieDetailsResponse,
  MovieImagesResponse,
  MovieVideosResponse,
  TmdbImage,
  TmdbMovieSummary,
  TmdbVideo,
} from './movie-responses';

function ensureArray<T>(value: T[] | undefined, fieldName: string): T[] {
  if (!Array.isArray(value)) {
    throw new InvalidResponseError(`TMDB response is missing a valid ${fieldName} array.`);
  }

  return value;
}

function mapMovieImage(image: TmdbImage): MovieImage {
  return {
    aspectRatio: image.aspect_ratio,
    filePath: image.file_path,
    height: image.height,
    width: image.width,
  };
}

function mapGenre(genre: { id: number; name: string }): MovieGenre {
  return { id: genre.id, name: genre.name };
}

export function mapMovieSummary(response: TmdbMovieSummary): Movie {
  return {
    backdropPath: response.backdrop_path,
    genreIds: response.genre_ids,
    id: String(response.id),
    overview: response.overview,
    posterPath: response.poster_path,
    releaseDate: response.release_date || null,
    title: response.title,
    voteAverage: response.vote_average,
  };
}

export function mapMovieDetails(response: MovieDetailsResponse): MovieDetails {
  const genres = ensureArray(response.genres, 'genres');

  return {
    ...mapMovieSummary({
      backdrop_path: response.backdrop_path,
      genre_ids: genres.map((genre) => genre.id),
      id: response.id,
      overview: response.overview,
      poster_path: response.poster_path,
      release_date: response.release_date,
      title: response.title,
      vote_average: response.vote_average,
    }),
    genres: genres.map(mapGenre),
    runtimeMinutes: response.runtime,
  };
}

export function mapMovieImages(response: MovieImagesResponse): MovieImages {
  return {
    backdrops: ensureArray(response.backdrops, 'backdrops').map(mapMovieImage),
    logos: ensureArray(response.logos, 'logos').map(mapMovieImage),
    posters: ensureArray(response.posters, 'posters').map(mapMovieImage),
  };
}

function isUsableYouTubeVideo(video: TmdbVideo): boolean {
  return video.site === 'YouTube' && Boolean(video.key);
}

function mapTrailer(video: TmdbVideo): MovieTrailer {
  return {
    isOfficial: video.official,
    name: video.name,
    videoKey: video.key,
  };
}

export function selectMovieTrailer(response: MovieVideosResponse): MovieTrailer | null {
  const videos = ensureArray(response.results, 'results').filter(isUsableYouTubeVideo);
  const trailerVideos = videos.filter((video) => video.type === 'Trailer');

  const selectedVideo =
    trailerVideos.find((video) => video.official) ??
    trailerVideos[0] ??
    videos.find((video) => video.official) ??
    videos[0];

  return selectedVideo ? mapTrailer(selectedVideo) : null;
}
