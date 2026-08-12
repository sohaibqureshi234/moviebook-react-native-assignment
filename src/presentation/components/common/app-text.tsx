/**
 * AppText — Typed text component using centralized typography tokens.
 *
 * Eliminates hardcoded font-size/weight/family across the app.
 * All typography variants are sourced from `src/core/theme/typography.ts`.
 *
 * Usage:
 *   <AppText variant="screenTitle" color={colors.textPrimary}>Watch</AppText>
 *   <AppText variant="body" color={colors.textSecondary}>Overview...</AppText>
 */
import { Text, type TextProps, type TextStyle } from 'react-native';

import { typography } from '@/core/theme';

export type TextVariant = keyof typeof typography;

type AppTextProps = TextProps & {
  variant: TextVariant;
  color?: string;
  style?: TextStyle;
};

export function AppText({ variant, color, style, children, ...rest }: AppTextProps) {
  return (
    <Text
      style={[typography[variant], color ? { color } : undefined, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
