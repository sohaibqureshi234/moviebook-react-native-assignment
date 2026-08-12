import { moderateScale } from '../utils/scale';

// Font families loaded in _layout.tsx
export const fontFamily = {
  poppinsRegular: 'Poppins-Regular',
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',

  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
} as const;

// Helper to scale font size and line height.
const s = (size: number) => moderateScale(size, 0.4);

export const typography = {
  screenTitle: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(18),
    fontWeight: '500' as const,
    lineHeight: s(24),
  },

  sectionTitle: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(14),
    fontWeight: '500' as const,
    lineHeight: s(18),
  },

  cardTitle: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(18),
    fontWeight: '500' as const,
    lineHeight: s(24),
  },

  body: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: s(14),
    fontWeight: '400' as const,
    lineHeight: s(20),
  },

  bodySecondary: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: s(14),
    fontWeight: '400' as const,
    lineHeight: s(20),
  },

  button: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: s(16),
    fontWeight: '600' as const,
    lineHeight: s(22),
    letterSpacing: 0.2,
  },

  caption: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(12),
    fontWeight: '500' as const,
    lineHeight: s(16),
  },

  genreLabel: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(12),
    fontWeight: '500' as const,
    lineHeight: s(16),
  },

  tabActive: {
    fontFamily: fontFamily.poppinsSemiBold,
    fontSize: s(12),
    fontWeight: '600' as const,
    lineHeight: s(16),
  },

  tabInactive: {
    fontFamily: fontFamily.poppinsRegular,
    fontSize: s(12),
    fontWeight: '400' as const,
    lineHeight: s(16),
    letterSpacing: 0.1,
  },

  seatMapRowLabel: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(6),
    lineHeight: s(8),
  },

  seatMapScreenLabel: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(8),
    lineHeight: s(12),
  },

  seatMapZoomLabel: {
    fontFamily: fontFamily.poppinsMedium,
    fontSize: s(18),
    lineHeight: s(28),
  },
} as const;
