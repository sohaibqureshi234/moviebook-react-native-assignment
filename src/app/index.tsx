import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import type { Movie } from '@/domain/entities/movie';
import { MovieCard } from '@/presentation/movie/components/movie-card';
import { useUpcomingMovies } from '@/presentation/movie/hooks/use-upcoming-movies';
import { BottomTabBar } from '@/presentation/components/common';

export default function HomeScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const { error, isLoading, movies, retry } = useUpcomingMovies();

  const renderMovie = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } })}
    />
  );

  const listBottomPadding = layout.bottomNavigationHeight + safeAreaInsets.bottom + spacing.xxl;

  return (
    <View style={styles.container}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <SafeAreaView style={styles.header}>
        {/* Figma: Poppins Medium 16px, #202C43, top:64 left:22 */}
        <Text style={styles.screenTitle}>Watch</Text>
        <Pressable
          accessibilityLabel="Search movies"
          accessibilityRole="button"
          hitSlop={spacing.sm}
          onPress={() => router.push('/search')}
        >
          <SymbolView
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={22}
            tintColor={colors.textPrimary}
          />
        </Pressable>
      </SafeAreaView>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      {isLoading ? (
        <View style={styles.stateContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : error ? (
        <View style={styles.stateContainer}>
          <Text style={styles.stateTitle}>Unable to load movies</Text>
          <Text style={styles.stateDescription}>Please check your connection and try again.</Text>
          <Pressable accessibilityRole="button" onPress={retry} style={styles.retryButton}>
            <Text style={styles.retryLabel}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={[styles.listContent, { paddingBottom: listBottomPadding }]}
          data={movies}
          initialNumToRender={4}
          keyExtractor={(movie) => movie.id}
          ListEmptyComponent={
            <View style={styles.stateContainer}>
              <Text style={styles.stateTitle}>No upcoming movies</Text>
              <Text style={styles.stateDescription}>Please check back again soon.</Text>
            </View>
          }
          renderItem={renderMovie}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Bottom Navigation ────────────────────────────────────────────── */}
      <View style={styles.navigationSafeArea}>
        <BottomTabBar activeTab="watch" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  screenTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
  },
  listContent: {
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  stateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  stateTitle: {
    ...typography.screenTitle,
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
  navigationSafeArea: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
