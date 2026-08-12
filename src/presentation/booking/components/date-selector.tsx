/**
 * DateSelector — Horizontal scrollable date pill selector.
 *
 * Figma Screen 6 spec:
 *   Date pill: 68×32, borderRadius 12
 *   Label: Poppins Medium 12px
 *   Selected: background #61C3F2, white text
 *   Unselected: background #F0F0F5, textPrimary
 */
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing, typography } from '@/core/theme';
import type { BookingDate, BookingDateId } from '@/presentation/booking/data/booking-options';

type DateSelectorProps = {
  dates: readonly BookingDate[];
  onSelect: (dateId: BookingDateId) => void;
  selectedDateId: BookingDateId;
};

export function DateSelector({ dates, onSelect, selectedDateId }: DateSelectorProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {dates.map((date) => {
        const isSelected = date.id === selectedDateId;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            key={date.id}
            onPress={() => onSelect(date.id)}
            style={[styles.date, isSelected && styles.selectedDate]}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {date.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.sm, paddingLeft: spacing.lg, paddingRight: spacing.lg },
  date: {
    alignItems: 'center',
    backgroundColor: '#F6F6FA',
    borderRadius: radius.control,
    height: 32,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  selectedDate: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedLabel: { color: colors.onPrimary },
});
