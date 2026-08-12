import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import type { Seat } from '@/presentation/booking/data/seat-map-data';

type SeatSummaryProps = {
  onProceed: () => void;
  selectedSeats: readonly Seat[];
  totalPrice: number;
};

const legendItems = [
  { color: colors.seatSelected, label: 'Selected' },
  { color: colors.seatUnavailable, label: 'Not available' },
  { color: colors.seatVip, label: 'VIP (150$)' },
  { color: colors.seatAvailable, label: 'Regular (50 $)' },
] as const;

export function SeatSummary({ onProceed, selectedSeats, totalPrice }: SeatSummaryProps) {
  const focusedSeat = selectedSeats.at(-1);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.legend}>
        {legendItems.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendSeat, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
      {focusedSeat ? (
        <View style={styles.selectedChip}>
          <Text style={styles.chipNumber}>{focusedSeat.number}</Text>
          <Text style={styles.chipLabel}>/ {focusedSeat.row} row</Text>
        </View>
      ) : null}
      <View style={styles.totalRow}>
        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>$ {totalPrice}</Text>
        </View>
        <Pressable accessibilityRole="button" disabled={selectedSeats.length === 0} onPress={onProceed} style={[styles.cta, selectedSeats.length === 0 && styles.disabledCta]}>
          <Text style={styles.ctaLabel}>Proceed to pay</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chipLabel: { ...typography.body, color: colors.textPrimary },
  chipNumber: { ...typography.screenTitle, color: colors.textPrimary },
  container: { backgroundColor: colors.surface, paddingBottom: spacing.lg, paddingHorizontal: layout.bookingCtaHorizontalInset, paddingTop: spacing.xl },
  cta: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.control, flex: 1, height: layout.buttonHeight, justifyContent: 'center', marginLeft: spacing.sm },
  ctaLabel: { ...typography.button, color: colors.onPrimary },
  disabledCta: { opacity: 0.5 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', rowGap: spacing.lg },
  legendItem: { alignItems: 'center', flexDirection: 'row', width: '50%' },
  legendLabel: { ...typography.body, color: colors.textSecondary, marginLeft: spacing.md },
  legendSeat: { borderRadius: radius.seat, height: 13, width: 17 },
  selectedChip: { alignItems: 'baseline', backgroundColor: colors.background, borderRadius: radius.control, flexDirection: 'row', marginTop: spacing.xxl, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, alignSelf: 'flex-start' },
  total: { backgroundColor: colors.background, borderRadius: radius.control, height: layout.buttonHeight, justifyContent: 'center', paddingHorizontal: spacing.lg, width: 108 },
  totalLabel: { ...typography.caption, color: colors.textPrimary },
  totalPrice: { ...typography.screenTitle, color: colors.textPrimary },
  totalRow: { flexDirection: 'row', marginTop: spacing.xxl },
});
