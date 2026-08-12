import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/core/theme';
import { TrailerPlayer } from '@/presentation/movie/components/trailer-player';
import { useMovieTrailer } from '@/presentation/movie/hooks/use-movie-trailer';

export default function TrailerRoute() {
  const router = useRouter();

  const { movieId } = useLocalSearchParams<{
    movieId: string;
  }>();

  const selectedMovieId = Array.isArray(movieId)
    ? movieId[0]
    : movieId;

  const {
    error,
    isLoading,
    retry,
    trailer,
  } = useMovieTrailer(selectedMovieId ?? '');

  const [playbackError, setPlaybackError] = useState(false);

  const closePlayer = useCallback(() => {
    router.back();
  }, [router]);

  const handlePlaybackError = useCallback(() => {
    setPlaybackError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setPlaybackError(false);
    retry();
  }, [retry]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
        />

        <Pressable
          accessibilityLabel="Done"
          accessibilityRole="button"
          onPress={closePlayer}
          style={styles.doneButton}>
          <Text style={styles.doneLabel}>Done</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (error || !trailer || playbackError) {
    const title = playbackError
      ? 'Unable to play trailer'
      : error
        ? 'Unable to load trailer'
        : 'Trailer unavailable';

    const description =
      playbackError || error
        ? 'Please check your connection and try again.'
        : 'A trailer is not available for this movie.';

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.message}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.description}>
            {description}
          </Text>

          {playbackError || error ? (
            <Pressable
              accessibilityRole="button"
              onPress={handleRetry}
              style={styles.retryButton}>
              <Text style={styles.retryLabel}>Retry</Text>
            </Pressable>
          ) : null}
        </View>

        <Pressable
          accessibilityLabel="Done"
          accessibilityRole="button"
          onPress={closePlayer}
          style={styles.doneButton}>
          <Text style={styles.doneLabel}>Done</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <TrailerPlayer
      onDone={closePlayer}
      onPlaybackError={handlePlaybackError}
      trailer={trailer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.videoBackground,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },

  message: {
    alignItems: 'center',
  },

  title: {
    ...typography.sectionTitle,
    color: colors.onPrimary,
    textAlign: 'center',
  },

  description: {
    ...typography.bodySecondary,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textAlign: 'center',
  },

  retryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.control,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },

  retryLabel: {
    ...typography.button,
    color: colors.onPrimary,
  },

  doneButton: {
    backgroundColor: colors.videoControl,
    borderRadius: radius.control,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    position: 'absolute',
    right: spacing.lg,
    top: spacing.xl,
  },

  doneLabel: {
    ...typography.body,
    color: colors.onPrimary,
    fontFamily: typography.sectionTitle.fontFamily,
    fontWeight: typography.sectionTitle.fontWeight,
  },
});