export type SeatStatus = 'available' | 'selected' | 'unavailable' | 'vip';

export type Seat = {
  id: string;
  number: number;
  price: number;
  row: number;
  status: Exclude<SeatStatus, 'selected'>;
};

export type SeatSection = {
  id: string;
  seats: readonly Seat[];
};

export type SeatRow = {
  number: number;
  sections: readonly SeatSection[];
};

export const seatMapPresentation = {
  movieTitle: 'The King’s Man',
} as const;

const unavailableSeatIds = new Set([
  'r1-s7', 'r1-s8', 'r1-s12', 'r2-s2', 'r2-s6', 'r2-s11', 'r3-s9',
  'r4-s3', 'r4-s8', 'r5-s5', 'r5-s14', 'r6-s1', 'r6-s10', 'r7-s4', 'r7-s17',
  'r8-s7', 'r8-s15', 'r9-s2', 'r9-s12',
]);

export const initialSelectedSeatIds = ['r3-s4'] as const;

function createSeat(row: number, number: number): Seat {
  const id = `r${row}-s${number}`;
  const isVip = row === 10;

  return {
    id,
    number,
    price: isVip ? 150 : 50,
    row,
    status: isVip ? 'vip' : unavailableSeatIds.has(id) ? 'unavailable' : 'available',
  };
}

function createSection(row: number, section: number): SeatSection {
  const firstSeatNumber = section * 5 + 1;

  return {
    id: `r${row}-section-${section + 1}`,
    seats: Array.from({ length: 5 }, (_, index) => createSeat(row, firstSeatNumber + index)),
  };
}

export const seatRows: readonly SeatRow[] = Array.from({ length: 10 }, (_, rowIndex) => {
  const row = rowIndex + 1;
  const firstSection = row === 1 ? 1 : 0;

  return {
    number: row,
    sections: Array.from({ length: 4 - firstSection }, (_, sectionIndex) => createSection(row, firstSection + sectionIndex)),
  };
});

export const allSeats = seatRows.flatMap((row) => row.sections.flatMap((section) => section.seats));
