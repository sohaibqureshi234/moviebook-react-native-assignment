import { useMemo, useState } from 'react';

import {
  bookingDates,
  type BookingDateId,
  showtimes,
  type ShowtimeId,
} from '@/presentation/booking/data/booking-options';

export function useBookingSelection() {
  const [selectedDateId, setSelectedDateId] = useState<BookingDateId>(bookingDates[0].id);
  const availableShowtimes = useMemo(
    () => showtimes.filter((showtime) => showtime.dateId === selectedDateId),
    [selectedDateId],
  );
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<ShowtimeId>(showtimes[0].id);

  const selectDate = (dateId: BookingDateId) => {
    setSelectedDateId(dateId);
    const firstShowtime = showtimes.find((showtime) => showtime.dateId === dateId);

    if (firstShowtime) {
      setSelectedShowtimeId(firstShowtime.id);
    }
  };

  const selectedShowtime = showtimes.find((showtime) => showtime.id === selectedShowtimeId) ?? null;

  return {
    availableShowtimes,
    selectedDateId,
    selectedShowtime,
    selectedShowtimeId,
    selectDate,
    setSelectedShowtimeId,
  };
}
