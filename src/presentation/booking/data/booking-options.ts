export type BookingDate = {
  id: BookingDateId;
  label: string;
};

export type BookingDateId = 'mar-5' | 'mar-6' | 'mar-7' | 'mar-8' | 'mar-9';

export type Showtime = {
  cinema: string;
  dateId: BookingDateId;
  id: string;
  price: string;
  rewards: string;
  time: string;
};

export const bookingDates = [
  { id: 'mar-5', label: '5 Mar' },
  { id: 'mar-6', label: '6 Mar' },
  { id: 'mar-7', label: '7 Mar' },
  { id: 'mar-8', label: '8 Mar' },
  { id: 'mar-9', label: '9 Mar' },
] as const satisfies readonly BookingDate[];

export const showtimes = [
  {
    cinema: 'Cinetech + Hall 1',
    dateId: 'mar-5',
    id: 'cinetech-hall-1-1230',
    price: '50$',
    rewards: '2500 bonus',
    time: '12:30',
  },
  {
    cinema: 'Cinetech + Hall 2',
    dateId: 'mar-5',
    id: 'cinetech-hall-2-1330',
    price: '75$',
    rewards: '3000 bonus',
    time: '13:30',
  },
  {
    cinema: 'Cinetech + Hall 1',
    dateId: 'mar-6',
    id: 'cinetech-hall-1-1245',
    price: '50$',
    rewards: '2500 bonus',
    time: '12:45',
  },
  {
    cinema: 'Cinetech + Hall 2',
    dateId: 'mar-7',
    id: 'cinetech-hall-2-1300',
    price: '75$',
    rewards: '3000 bonus',
    time: '13:00',
  },
  {
    cinema: 'Cinetech + Hall 1',
    dateId: 'mar-8',
    id: 'cinetech-hall-1-1215',
    price: '50$',
    rewards: '2500 bonus',
    time: '12:15',
  },
  {
    cinema: 'Cinetech + Hall 2',
    dateId: 'mar-9',
    id: 'cinetech-hall-2-1345',
    price: '75$',
    rewards: '3000 bonus',
    time: '13:45',
  },
] as const satisfies readonly Showtime[];

export type ShowtimeId = (typeof showtimes)[number]['id'];
export type BookingShowtime = (typeof showtimes)[number];
