/**
 * MovieDetailsContent — Full-bleed movie detail screen content.
 *
 * Figma Screen 5 spec:
 *   "Get Tickets" button: Poppins SemiBold 14px, lineHeight 20, letterSpacing 0.2, bg #61C3F2
 *   "Genres" label: Poppins Medium 16px, lineHeight 20, color #202C43
 *   Genre chips: pill-shaped, content-sized (not full-width)
 *   "Overview" label: Poppins Medium 16px, lineHeight 20, color #202C43
 *   Overview body: Poppins Regular 12px, lineHeight 19 (160%), color #8F8F8F
 *   Back "Watch" label: Poppins Medium 16px
 */
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { SymbolView } from 'expo-symbols';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import { buildBackdropUrl, buildPosterUrl } from '@/core/utils/tmdb-image-url';
import type { MovieDetails } from '@/domain/entities/movie';

import { GenreChip } from './genre-chip';

type MovieDetailsContentProps = {
  movie: MovieDetails;
  onBack: () => void;
  onGetTickets: () => void;
  onWatchTrailer: () => void;
};

function formatReleaseDate(releaseDate: string | null): string | null {
  if (!releaseDate) {
    return null;
  }

  const date = new Date(`${releaseDate}T00:00:00Z`);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
}

export function MovieDetailsContent({
  movie,
  onBack,
  onGetTickets,
  onWatchTrailer,
}: MovieDetailsContentProps) {
  const backdropUrl =
    buildBackdropUrl(movie.backdropPath, 'w780') ?? buildPosterUrl(movie.posterPath, 'w500');
  const releaseDate = formatReleaseDate(movie.releaseDate);
  const metadata = [
    releaseDate && `In Theaters ${releaseDate}`,
    movie.runtimeMinutes && `${movie.runtimeMinutes} min`,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <View style={styles.container}>
      {/* ── Hero / Backdrop Section ─────────────────────────────────────── */}
      <View style={styles.hero}>
        {backdropUrl ? (
          <ImageBackground
            resizeMode="cover"
            source={{ uri: backdropUrl }}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.heroFallback]} />
        )}
        <View pointerEvents="none" style={styles.heroOverlay} />

        {/* Back button with "Watch" label */}
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={spacing.md}
          onPress={onBack}
          style={styles.backButton}
        >
          <SymbolView
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            size={20}
            tintColor={colors.onPrimary}
          />
          {/* Figma: Poppins Medium 16px, white */}
          <Text style={styles.backLabel}>Watch</Text>
        </Pressable>

        {/* Hero content — title, metadata, CTA buttons */}
        <View style={styles.heroContent}>
          <Text numberOfLines={2} style={styles.heroTitle}>
            {movie.title}
          </Text>
          {metadata ? <Text style={styles.metadata}>{metadata}</Text> : null}

          {/* "Get Tickets" — Figma: Poppins SemiBold 14px, bg #61C3F2 */}
          <Pressable
            accessibilityRole="button"
            onPress={onGetTickets}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.primaryButtonLabel}>Get Tickets</Text>
          </Pressable>

          {/* "Watch Trailer" — outlined secondary button */}
          <Pressable
            accessibilityRole="button"
            onPress={onWatchTrailer}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
          >
            <SymbolView
              name={{ ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
              size={14}
              tintColor={colors.onPrimary}
            />
            <Text style={styles.secondaryButtonLabel}>Watch Trailer</Text>
          </Pressable>
        </View>
      </View>

      {/* ── Detail Section ──────────────────────────────────────────────── */}
      <View style={styles.details}>
        {/* Genres */}
        {movie.genres.length > 0 ? (
          <>
            {/* Figma: Poppins Medium 16px, #202C43 */}
            <Text style={styles.sectionTitle}>Genres</Text>
            <View style={styles.genreList}>
              {movie.genres.map((genre) => (
                <GenreChip genre={genre} key={genre.id} />
              ))}
            </View>
            <View style={styles.divider} />
          </>
        ) : null}

        {/* Overview */}
        {/* Figma: Poppins Medium 16px, #202C43 */}
        <Text style={styles.sectionTitle}>Overview</Text>
        {/* Figma: Poppins Regular 12px, 160% lineHeight, #8F8F8F */}
        <Text style={styles.overview}>
          {movie.overview || 'No overview is available for this movie.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  hero: {
    height: layout.movieDetailsHeroHeight,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroFallback: {
    backgroundColor: colors.navigation,
  },
  heroOverlay: {
    backgroundColor: colors.imageScrim,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    left: spacing.xl,
    position: 'absolute',
    top: layout.movieDetailsTopInset,
  },
  backLabel: {
    ...typography.screenTitle,
    color: colors.onPrimary,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heroTitle: {
    ...typography.screenTitle,
    color: colors.onPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  metadata: {
    ...typography.sectionTitle,
    color: colors.onPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  // "Get Tickets" — Figma: Poppins SemiBold 14px, lineHeight 20, bg #61C3F2
  primaryButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: radius.control,
    height: 50,
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  primaryButtonLabel: {
    ...typography.button,
    color: colors.onPrimary,
  },
  // "Watch Trailer" — outlined
  secondaryButton: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: colors.primary,
    borderRadius: radius.control,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.sm,
    height: 50,
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  secondaryButtonLabel: {
    ...typography.button,
    color: colors.onPrimary,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  details: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xl,
  },
  sectionTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: spacing.xl,
  },
  overview: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
