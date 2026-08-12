/**
 * MovieSearchResult — Search result list item.
 *
 * Figma Screen 3 spec:
 *   Title: Poppins Medium 16px / 125% / color #202C43
 *   Metadata (genre/year): Poppins Regular 12px / color #8F8F8F
 *   3-dot menu: small dots ~5×5px, total ~16-20px icon visual area
 *   Poster: 130×100, resizeMode cover, borderRadius 10
 */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import { buildPosterUrl } from '@/core/utils/tmdb-image-url';
import type { Movie } from '@/domain/entities/movie';

type MovieSearchResultProps = {
  movie: Movie;
  onPress: () => void;
};

function getMetadata(movie: Movie): string {
  const year = movie.releaseDate?.slice(0, 4);
  return year ? `${year} • ${movie.voteAverage.toFixed(1)}/10` : `${movie.voteAverage.toFixed(1)}/10`;
}

export function MovieSearchResult({ movie, onPress }: MovieSearchResultProps) {
  const posterUrl = buildPosterUrl(movie.posterPath, 'w342');

  return (
    <Pressable
      accessibilityHint="Opens movie details"
      accessibilityLabel={`Open ${movie.title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {/* ── Poster ───────────────────────────────────────────────────────── */}
      {posterUrl ? (
        <Image
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          source={{ uri: posterUrl }}
          style={styles.poster}
        />
      ) : (
        <View style={[styles.poster, styles.posterFallback]} />
      )}

      {/* ── Title + Metadata ─────────────────────────────────────────────── */}
      <View style={styles.content}>
        {/* Figma: Poppins Medium 16px, lineHeight 20, #202C43 */}
        <Text numberOfLines={2} style={styles.title}>
          {movie.title}
        </Text>
        {/* Figma: Poppins Regular 12px, #8F8F8F */}
        <Text numberOfLines={1} style={styles.metadata}>
          {getMetadata(movie)}
        </Text>
      </View>

      {/* ── 3-dot context menu icon ───────────────────────────────────────── */}
      <View style={styles.more} accessibilityRole="button" accessibilityLabel="More options">
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: layout.searchResultHeight,
  },
  poster: {
    borderRadius: radius.control,
    height: layout.searchResultHeight,
    width: layout.searchResultPosterWidth,
  },
  posterFallback: {
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    marginLeft: spacing.xl,
  },
  title: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  metadata: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  // 3-dot menu — small, properly sized per Figma
  more: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    marginLeft: spacing.sm,
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: colors.textSecondary,
    borderRadius: radius.seat,
    height: 4,
    width: 4,
  },
  pressed: {
    opacity: 0.75,
  },
});
