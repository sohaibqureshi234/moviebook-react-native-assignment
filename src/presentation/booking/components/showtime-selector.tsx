/**
 * ShowtimeSelector — Horizontal scrollable showtime card selector.
 *
 * Figma Screen 6 spec:
 *   Card: 250×146, borderRadius 16, borderWidth 1
 *   Time label: Poppins Medium 16px
 *   Cinema name: Poppins Regular 12px, textSecondary
 *   Price: Poppins Medium 12px, textPrimary
 */
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import type { BookingShowtime, ShowtimeId } from '@/presentation/booking/data/booking-options';

type ShowtimeSelectorProps = {
  onSelect: (showtimeId: ShowtimeId) => void;
  selectedShowtimeId: ShowtimeId;
  showtimes: readonly BookingShowtime[];
};

export function ShowtimeSelector({ onSelect, selectedShowtimeId, showtimes }: ShowtimeSelectorProps) {
  return (
    <ScrollView contentContainerStyle={styles.content} horizontal showsHorizontalScrollIndicator={false}>
      {showtimes.map((showtime) => {
        const isSelected = showtime.id === selectedShowtimeId;

        return (
          <View key={showtime.id} style={styles.item}>
            <View style={styles.heading}>
              {/* Figma: Poppins Medium 16px */}
              <Text style={styles.time}>{showtime.time}</Text>
              {/* Figma: Poppins Regular 12px, textSecondary */}
              <Text numberOfLines={1} style={styles.cinema}>{showtime.cinema}</Text>
            </View>
            <Pressable
              accessibilityLabel={`${showtime.time}, ${showtime.cinema}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => onSelect(showtime.id)}
              style={[styles.card, isSelected && styles.selectedCard]}
            >
              <View style={styles.previewArea}>
                <View style={styles.previewScreen} />
                <View style={styles.seatGrid}>
                  {Array.from({ length: 10 }).map((_, r) => (
                    <View key={r} style={styles.seatRow}>
                      <View style={styles.seatGroup}>
                        {Array.from({ length: 3 }).map((_, c) => (
                          <View key={c} style={[styles.seatDot, r === 3 && c === 2 && styles.vipDot, r === 2 && c === 1 && styles.primaryDot]} />
                        ))}
                      </View>
                      <View style={styles.seatGroup}>
                        {Array.from({ length: 8 }).map((_, c) => (
                          <View key={c} style={[styles.seatDot, r === 5 && c === 4 && styles.primaryDot, r === 8 && c === 6 && styles.primaryDot]} />
                        ))}
                      </View>
                      <View style={styles.seatGroup}>
                        {Array.from({ length: 3 }).map((_, c) => (
                          <View key={c} style={[styles.seatDot, r === 4 && c === 0 && styles.pinkDot]} />
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </Pressable>
            {/* Figma: Poppins Medium 12px price label */}
            <Text style={styles.price}>
              <Text style={styles.pricePrefix}>From </Text>
              {showtime.price}
              <Text style={styles.pricePrefix}> or </Text>
              {showtime.rewards}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: 'rgba(32, 44, 67, 0.1)', // Unselected card border
    borderRadius: radius.card,
    borderWidth: 1,
    height: 145,
    justifyContent: 'center',
    padding: spacing.md,
    width: layout.bookingShowtimeCardWidth,
    backgroundColor: colors.surface,
  },
  cinema: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    flex: 1,
    marginLeft: spacing.md,
  },
  content: { gap: spacing.md, paddingRight: spacing.xl },
  heading: { flexDirection: 'row', marginBottom: spacing.sm, alignItems: 'center' },
  item: { width: layout.bookingShowtimeCardWidth },
  previewArea: {
    backgroundColor: '#F6F6FA',
    borderColor: 'rgba(32, 44, 67, 0.05)',
    borderRadius: radius.control,
    borderWidth: 1,
    flex: 1,
    paddingTop: spacing.xs,
    alignItems: 'center',
  },
  price: { ...typography.sectionTitle, color: colors.textPrimary, marginTop: spacing.md, flexDirection: 'row', alignItems: 'baseline' },
  pricePrefix: { ...typography.bodySecondary, color: colors.textSecondary },
  previewScreen: {
    borderColor: colors.primary,
    borderRadius: 100,
    borderTopWidth: 2,
    height: 10,
    marginBottom: 4,
    width: '60%',
  },
  seatGrid: { gap: 2 },
  seatRow: { flexDirection: 'row', gap: 6, justifyContent: 'center' },
  seatGroup: { flexDirection: 'row', gap: 2 },
  seatDot: { backgroundColor: '#D8D8D8', borderRadius: 1.5, height: 3, width: 3 },
  primaryDot: { backgroundColor: colors.primary },
  vipDot: { backgroundColor: '#564CA3' },
  pinkDot: { backgroundColor: '#E26CA5' },
  selectedCard: { borderColor: colors.primary, backgroundColor: 'rgba(97, 195, 242, 0.1)' },
  time: { fontFamily: 'Poppins-Medium', fontSize: 16, color: colors.textPrimary },
});
