/**
 * MovieCard — Full-width movie card with backdrop image.
 * Used on Screen 1 (Watch) and Screen 4 (Search Results).
 *
 * Figma spec:
 *   Aspect ratio 335/180 ≈ 1.86:1
 *   Title: Poppins Medium 16px, white, bottom-left
 *   Image: resizeMode cover
 */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { buildBackdropUrl, buildPosterUrl } from '@/core/utils/tmdb-image-url';
import { colors, radius, spacing, typography } from '@/core/theme';
import type { Movie } from '@/domain/entities/movie';

type MovieCardProps = {
  movie: Movie;
  onPress: () => void;
};

export function MovieCard({ movie, onPress }: MovieCardProps) {
  const imageUrl =
    buildBackdropUrl(movie.backdropPath) ?? buildPosterUrl(movie.posterPath, 'w500');

  return (
    <Pressable
      accessibilityHint="Opens movie details"
      accessibilityLabel={`Open ${movie.title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {imageUrl ? (
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      ) : (
        <View style={styles.imageFallback} />
      )}
      <View pointerEvents="none" style={styles.scrim} />
      {/* Figma: Poppins Medium 16px, white */}
      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 16 / 9,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  imageFallback: {
    backgroundColor: colors.border,
    height: '100%',
    width: '100%',
  },
  pressed: {
    opacity: 0.9,
  },
  scrim: {
    backgroundColor: colors.imageScrim,
    bottom: 0,
    height: '48%',
    position: 'absolute',
    width: '100%',
  },
  title: {
    ...typography.cardTitle,
    bottom: spacing.md,
    color: colors.onPrimary,
    left: spacing.md,
    position: 'absolute',
    right: spacing.xl,
    textTransform: 'capitalize',
  },
});
