import { useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/core/theme';
import { MovieDetailsContent } from '@/presentation/movie/components/movie-details-content';
import { useMovieDetails } from '@/presentation/movie/hooks/use-movie-details';

export default function MovieDetailsRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = Array.isArray(id) ? id[0] : id;
  const { details, error, isLoading, retry } = useMovieDetails(movieId ?? '');

  const goBack = () => router.back();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.stateScreen}>
        <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={goBack}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <ActivityIndicator color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  if (error || !details) {
    return (
      <SafeAreaView style={styles.stateScreen}>
        <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={goBack}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <View style={styles.stateContent}>
          <Text style={styles.stateTitle}>Unable to load this movie</Text>
          <Text style={styles.stateDescription}>Please check your connection and try again.</Text>
          <Pressable accessibilityRole="button" onPress={retry} style={styles.retryButton}>
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <MovieDetailsContent
        movie={details}
        onBack={goBack}
        onGetTickets={() => router.push({ pathname: '/booking', params: { movieId } })}
        onWatchTrailer={() => router.push({ pathname: '/trailer', params: { movieId } })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.surface,
    flexGrow: 1,
  },
  stateScreen: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  backText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  stateContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  stateTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  stateDescription: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
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
});
