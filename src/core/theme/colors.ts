// Source: Figma file "Tentwenty — App Test" (node 42-777)
// All hex values are exact matches to the Figma spec.
export const colors = {
  // ── Brand / Accent ──────────────────────────────────────────────────────────
  primary: '#61C3F2',
  onPrimary: '#FFFFFF',    // Text/icon on primary colored surfaces

  // ── Surface ─────────────────────────────────────────────────────────────────
  background: '#F6F6FA',   // App background
  surface: '#FFFFFF',      // Card / sheet surfaces
  surfaceSubtle: '#F0F0F5',
  controlBorder: '#EBEBEB',

  // ── Text ────────────────────────────────────────────────────────────────────
  textPrimary: '#202C43',
  textSecondary: '#8F8F8F',
  textMuted: '#DBDBDF',    // Placeholder text, disabled text
  border: '#DBDBDF',

  // ── Navigation ──────────────────────────────────────────────────────────────
  navigation: '#2D2738',
  navigationInactive: '#817D87',
  scrollIndicator: '#B8BBC5',

  // ── Overlay / Media ─────────────────────────────────────────────────────────
  imageScrim: '#00000080',
  videoBackground: '#000000',
  videoControl: '#2D2738CC',

  // ── Genre Chips (exact Figma values) ────────────────────────────────────────
  genreAction: '#15D2BC',          // Teal
  genreThriller: '#E26CA5',        // Pink
  genreScienceFiction: '#564CA3',  // Purple
  genreFiction: '#CD9D0F',         // Yellow/Gold
  genreDefault: '#8F8F8F',         // Fallback

  // ── Seat Map ────────────────────────────────────────────────────────────────
  seatAvailable: '#61C3F2',    // Same as primary
  seatSelected: '#CD9D0F',     // Same as genreFiction
  seatVip: '#564CA3',          // Same as genreScienceFiction
  seatUnavailable: '#DBDBDF',
} as const;
