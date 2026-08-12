/**
 * GenreChip — Pill-shaped genre tag.
 *
 * Figma Screen 5 spec:
 *   Size: pill (borderRadius 20), paddingH 8, paddingV 4 — NOT full width
 *   Label: Poppins Medium 12px, white
 *   Colors (exact Figma hex):
 *     Action          → #15D2BC
 *     Thriller        → #E26CA5
 *     Science Fiction → #564CA3
 *     Fiction         → #CD9D0F
 *     (others)        → #8F8F8F
 */
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, typography } from '@/core/theme';
import type { MovieGenre } from '@/domain/entities/movie';

type GenreChipProps = {
  genre: MovieGenre;
};

function getGenreColor(name: string): string {
  switch (name) {
    case 'Action':
      return colors.genreAction;          // #15D2BC
    case 'Thriller':
      return colors.genreThriller;        // #E26CA5
    case 'Science Fiction':
      return colors.genreScienceFiction;  // #564CA3
    case 'Fiction':
      return colors.genreFiction;         // #CD9D0F
    case 'Crime':
      return colors.navigation;           // dark
    case 'Horror':
      return '#8B3A3A';
    case 'Fantasy':
      return '#2C5F2E';
    case 'Drama':
    case 'Dramas':
      return colors.genreFiction;
    case 'Comedy':
    case 'Comedies':
      return colors.genreAction;
    case 'Animation':
      return '#E26CA5';
    case 'Adventure':
      return '#564CA3';
    default:
      return colors.genreDefault;         // #8F8F8F
  }
}

export function GenreChip({ genre }: GenreChipProps) {
  return (
    <View style={[styles.chip, { backgroundColor: getGenreColor(genre.name) }]}>
      <Text numberOfLines={1} style={styles.label}>
        {genre.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    // Pill shape, content-sized (not full-width)
    alignSelf: 'flex-start',
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    ...typography.genreLabel,
    color: colors.onPrimary,
  },
});
