import { useMemo, useState } from 'react';

import { allSeats, initialSelectedSeatIds, type Seat } from '@/presentation/booking/data/seat-map-data';

export function useSeatSelection() {
  const [selectedSeatIds, setSelectedSeatIds] = useState<readonly string[]>(initialSelectedSeatIds);

  const selectedSeats = useMemo(
    () => allSeats.filter((seat) => selectedSeatIds.includes(seat.id)),
    [selectedSeatIds],
  );
  const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'unavailable') {
      return;
    }

    setSelectedSeatIds((currentSeatIds) => (
      currentSeatIds.includes(seat.id)
        ? currentSeatIds.filter((seatId) => seatId !== seat.id)
        : [...currentSeatIds, seat.id]
    ));
  };

  return { selectedSeatIds, selectedSeats, toggleSeat, totalPrice };
}
