import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius } from '@/core/theme';
import type { Seat as SeatModel, SeatStatus } from '@/presentation/booking/data/seat-map-data';

type SeatProps = {
  onPress: (seat: SeatModel) => void;
  seat: SeatModel;
  status: SeatStatus;
};

const statusColors: Record<SeatStatus, string> = {
  available: colors.seatAvailable,
  selected: colors.seatSelected,
  unavailable: colors.seatUnavailable,
  vip: colors.seatVip,
};

export function Seat({ onPress, seat, status }: SeatProps) {
  const isUnavailable = status === 'unavailable';
  const label = `Seat ${seat.number}, row ${seat.row}, ${status === 'vip' ? 'VIP available' : status}`;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isUnavailable, selected: status === 'selected' }}
      disabled={isUnavailable}
      hitSlop={4}
      onPress={() => onPress(seat)}
      style={styles.touchTarget}
    >
      <View style={[styles.back, { backgroundColor: statusColors[status] }]}>
        <View style={[styles.cushion, { backgroundColor: statusColors[status] }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: 'center',
    borderRadius: radius.seat,
    height: 7,
    justifyContent: 'flex-start',
    paddingTop: 5,
    width: 8,
  },
  cushion: { borderRadius: radius.seat, height: 2, width: 10 },
  touchTarget: { alignItems: 'center', height: 14, justifyContent: 'center', width: 14 },
});
