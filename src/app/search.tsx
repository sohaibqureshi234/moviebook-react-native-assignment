import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import type { Movie } from '@/domain/entities/movie';
import { BottomTabBar, IconButton } from '@/presentation/components/common';
import { MovieSearchResult } from '@/presentation/search/components/movie-search-result';
import { useMovieSearch } from '@/presentation/search/hooks/use-movie-search';

export default function SearchRoute() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const { clear, error, isLoading, query, results, retry, setQuery } = useMovieSearch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasQuery = query.trim().length > 0;

  const renderResult = ({ item }: { item: Movie }) => (
    <MovieSearchResult
      movie={item}
      onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } })}
    />
  );

  const listBottomPadding =
    layout.bottomNavigationHeight + safeAreaInsets.bottom + spacing.xxl;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          {isSubmitted ? (
            <View style={styles.resultsHeader}>
              <IconButton
                icon={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
                iconSize={20}
                tintColor={colors.textPrimary}
                onPress={() => setIsSubmitted(false)}
                accessibilityLabel="Back to search"
              />
              <Text style={styles.resultsTitle}>{results.length} Results Found</Text>
            </View>
          ) : (
            <View style={styles.searchField}>
              <SymbolView
                name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
                size={20}
                tintColor={colors.textSecondary}
              />

              <TextInput
                accessibilityLabel="Search movies"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text) => {
                  setQuery(text);
                  if (text.trim().length === 0) setIsSubmitted(false);
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  if (query.trim().length > 0) {
                    setIsSubmitted(true);
                  }
                }}
                placeholder="TV shows, movies and more"
                placeholderTextColor={colors.textMuted}
                returnKeyType="search"
                style={styles.input}
                value={query}
              />

              <IconButton
                icon={{ ios: 'xmark', android: 'close', web: 'close' }}
                iconSize={16}
                tintColor={colors.textPrimary}
                touchTargetSize={44}
                onPress={() => {
                  clear();
                  setIsSubmitted(false);
                  Keyboard.dismiss();
                  router.back();
                }}
                accessibilityLabel="Clear search and go back"
              />
            </View>
          )}
        </SafeAreaView>

        {isLoading ? (
          <View style={styles.stateContainer}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : error ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateTitle}>Unable to search movies</Text>
            <Text style={styles.stateDescription}>
              Please check your connection and try again.
            </Text>
            <View style={styles.retryButtonWrapper}>
              <Text
                accessibilityRole="button"
                onPress={retry}
                style={styles.retryLabel}
              >
                Retry
              </Text>
            </View>
          </View>
        ) : hasQuery ? (
          <FlatList
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: listBottomPadding },
            ]}
            data={results}
            keyExtractor={(movie) => movie.id}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.stateTitle}>No results found</Text>
                <Text style={styles.stateDescription}>Try another movie title.</Text>
              </View>
            }
            ListHeaderComponent={
              !isSubmitted ? <Text style={styles.listTitle}>Top Results</Text> : null
            }
            renderItem={renderResult}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={[styles.emptyState, { paddingBottom: listBottomPadding }]}>
            <SymbolView
              name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
              size={48}
              tintColor={colors.textSecondary}
            />

            <Text style={styles.emptyTitle}>Search for movies</Text>

            <Text style={styles.emptySubtitle}>
              Find your favorite movies and discover something new.
            </Text>
          </View>
        )}

        <View style={styles.navigationSafeArea}>
          <BottomTabBar activeTab="watch" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  searchField: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.search,
    borderWidth: 1,
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: spacing.md,
  },
  resultsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
  },
  resultsTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
    marginLeft: spacing.md,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  listContent: {
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  listTitle: {
    ...typography.sectionTitle,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    color: colors.textPrimary,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  stateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: spacing.section,
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
  retryButtonWrapper: {
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
