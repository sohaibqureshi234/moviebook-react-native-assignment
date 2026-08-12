import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/core/theme';
import { BookingHeader } from '@/presentation/booking/components/booking-header';
import { SeatMap } from '@/presentation/booking/components/seat-map';
import { SeatSummary } from '@/presentation/booking/components/seat-summary';
import { bookingDates, showtimes } from '@/presentation/booking/data/booking-options';
import { seatMapPresentation, seatRows } from '@/presentation/booking/data/seat-map-data';
import { useSeatSelection } from '@/presentation/booking/hooks/use-seat-selection';

export default function SeatSelectionRoute() {
  const router = useRouter();
  const { date: dateParam, movieId: movieIdParam, showtimeId: showtimeIdParam } = useLocalSearchParams<{
    date: string;
    movieId: string;
    showtimeId: string;
  }>();
  const date = Array.isArray(dateParam) ? dateParam[0] : dateParam;
  const movieId = Array.isArray(movieIdParam) ? movieIdParam[0] : movieIdParam;
  const showtimeId = Array.isArray(showtimeIdParam) ? showtimeIdParam[0] : showtimeIdParam;
  const showtime = showtimes.find((item) => item.id === showtimeId);
  const bookingDate = bookingDates.find((item) => item.id === date);
  const { selectedSeatIds, selectedSeats, toggleSeat, totalPrice } = useSeatSelection();

  const subtitle = [bookingDate?.label, showtime?.time, showtime?.cinema]
    .filter((item) => item !== undefined)
    .join('  |  ');

  return (
    <View style={styles.screen}>
      <BookingHeader
        onBack={() => router.back()}
        subtitle={subtitle || 'Select your seats'}
        title={seatMapPresentation.movieTitle}
      />
      <SeatMap onSeatPress={toggleSeat} rows={seatRows} selectedSeatIds={selectedSeatIds} />
      <SeatSummary
        onProceed={() => {
          if (!movieId) {
            return;
          }
        }}
        selectedSeats={selectedSeats}
        totalPrice={totalPrice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
});
