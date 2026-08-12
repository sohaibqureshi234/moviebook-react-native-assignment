import { colors } from './colors';
import { radius } from './radius';
import { spacing } from './spacing';
import { typography } from './typography';

export const layout = {
  bottomNavigationHeight: 76,
  buttonHeight: 56,
  movieDetailsHeroHeight: 466,
  movieDetailsTopInset: 68,
  movieCardAspectRatio: 335 / 180,
  searchResultHeight: 100,
  searchResultPosterWidth: 130,
  bookingShowtimeCardWidth: 250,
  bookingContentTopInset: 96,
  bookingCtaHorizontalInset: 26,
} as const;

export const theme = {
  colors,
  layout,
  radius,
  spacing,
  typography,
} as const;
