import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, spacing, typography } from '@/core/theme';
import { BookingHeader } from '@/presentation/booking/components/booking-header';
import { DateSelector } from '@/presentation/booking/components/date-selector';
import { ShowtimeSelector } from '@/presentation/booking/components/showtime-selector';
import { bookingDates } from '@/presentation/booking/data/booking-options';
import { useBookingMovie } from '@/presentation/booking/hooks/use-booking-movie';
import { useBookingSelection } from '@/presentation/booking/hooks/use-booking-selection';
import { PrimaryButton } from '@/presentation/components/common';

export default function BookingRoute() {
  const router = useRouter();
  const { movieId: movieIdParam } = useLocalSearchParams<{ movieId: string }>();
  const movieId = Array.isArray(movieIdParam) ? movieIdParam[0] : movieIdParam;
  const movie = useBookingMovie(movieId ?? '');
  const {
    availableShowtimes,
    selectedDateId,
    selectedShowtime,
    selectedShowtimeId,
    selectDate,
    setSelectedShowtimeId,
  } = useBookingSelection();

  const goToSeats = () => {
    if (!movieId || !selectedShowtime) {
      return;
    }

    router.push({
      pathname: '/booking/seats',
      params: {
        date: selectedDateId,
        movieId,
        showtimeId: selectedShowtime.id,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <BookingHeader
        onBack={() => router.back()}
        subtitle={movie?.releaseDate ? `In Theaters ${movie.releaseDate}` : 'Select a showtime'}
        title={movie?.title ?? 'Movie booking'}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.sectionTitle}>Date</Text>
          <DateSelector dates={bookingDates} onSelect={selectDate} selectedDateId={selectedDateId} />
        </View>
        <View style={styles.showtimes}>
          <ShowtimeSelector
            onSelect={setSelectedShowtimeId}
            selectedShowtimeId={selectedShowtimeId}
            showtimes={availableShowtimes}
          />
        </View>
      </View>
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <PrimaryButton
          disabled={!movieId || !selectedShowtime}
          label="Select Seats"
          onPress={goToSeats}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, paddingTop: 64 },
  footer: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.lg,
    paddingHorizontal: layout.bookingCtaHorizontalInset,
    paddingTop: spacing.md,
  },
  screen: { backgroundColor: colors.surface, flex: 1 },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  showtimes: { marginTop: 40, paddingLeft: spacing.lg },
});
