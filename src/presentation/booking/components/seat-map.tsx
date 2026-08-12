import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/core/theme';
import type { Seat as SeatModel, SeatRow } from '@/presentation/booking/data/seat-map-data';
import { Seat } from '@/presentation/booking/components/seat';

type SeatMapProps = {
  onSeatPress: (seat: SeatModel) => void;
  rows: readonly SeatRow[];
  selectedSeatIds: readonly string[];
};

export function SeatMap({ onSeatPress, rows, selectedSeatIds }: SeatMapProps) {
  return (
    <View style={styles.container}>
      <View style={styles.screenCurve} />
      <Text style={styles.screenLabel}>SCREEN</Text>
      <View style={styles.rows}>
        {rows.map((row) => (
          <View key={row.number} style={styles.row}>
            <Text style={styles.rowLabel}>{row.number}</Text>
            <View style={styles.sections}>
              {row.sections.map((section) => (
                <View key={section.id} style={styles.section}>
                  {section.seats.map((seat) => {
                    const isSelected = selectedSeatIds.includes(seat.id);

                    return (
                      <Seat
                        key={seat.id}
                        onPress={onSeatPress}
                        seat={seat}
                        status={isSelected ? 'selected' : seat.status}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
      <View style={styles.zoomControls}>
        <Text style={styles.zoomLabel}>+</Text>
        <Text style={styles.zoomLabel}>−</Text>
      </View>
      <View style={styles.scrollIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 440, paddingTop: 60 },
  row: { alignItems: 'center', flexDirection: 'row', height: 16 },
  rowLabel: { ...typography.seatMapRowLabel, color: colors.textPrimary, width: spacing.lg },
  rows: { gap: spacing.xs, paddingHorizontal: spacing.sm },
  screenCurve: {
    alignSelf: 'center',
    borderColor: colors.primary,
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220,
    borderTopWidth: 1,
    height: 22,
    position: 'absolute',
    top: 44,
    width: 330,
  },
  screenLabel: { ...typography.seatMapScreenLabel, alignSelf: 'center', color: colors.textSecondary, marginBottom: spacing.xxl },
  scrollIndicator: { backgroundColor: colors.scrollIndicator, borderRadius: radius.control, bottom: spacing.sm, height: 5, left: spacing.lg, position: 'absolute', right: spacing.lg },
  section: { flexDirection: 'row', gap: 3 },
  sections: { flex: 1, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' },
  zoomControls: { bottom: spacing.xl, flexDirection: 'row', gap: spacing.sm, position: 'absolute', right: spacing.lg },
  zoomLabel: { ...typography.seatMapZoomLabel, alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.controlBorder, borderRadius: 28, borderWidth: 1, color: colors.textPrimary, height: 30, textAlign: 'center', width: 30 },
});
