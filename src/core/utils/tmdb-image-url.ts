const imageBaseUrl = 'https://image.tmdb.org/t/p';

type ImageSize = 'w185' | 'w342' | 'w500' | 'w780' | 'original';

function buildImageUrl(path: string | null, size: ImageSize): string | null {
  if (!path) {
    return null;
  }

  return `${imageBaseUrl}/${size}/${path.replace(/^\//, '')}`;
}

export function buildPosterUrl(path: string | null, size: ImageSize = 'w500'): string | null {
  return buildImageUrl(path, size);
}

export function buildBackdropUrl(path: string | null, size: ImageSize = 'w780'): string | null {
  return buildImageUrl(path, size);
}

export function buildLogoUrl(path: string | null, size: ImageSize = 'w500'): string | null {
  return buildImageUrl(path, size);
}
