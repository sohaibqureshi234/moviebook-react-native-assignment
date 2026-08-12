/**
 * PrimaryButton — Reusable CTA button.
 *
 * Figma spec: Poppins SemiBold 14px / lineHeight 20 / letterSpacing 0.2
 * Default background: colors.primary (#61C3F2)
 *
 * Usage:
 *   <PrimaryButton label="Get Tickets" onPress={handlePress} />
 *   <PrimaryButton label="Select Seats" onPress={handlePress} disabled />
 *   <PrimaryButton label="Buy" onPress={handlePress} backgroundColor="#E26CA5" />
 */
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, typography } from '@/core/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  /** Override text color (defaults to white) */
  labelColor?: string;
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  backgroundColor = colors.primary,
  labelColor = colors.onPrimary,
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: radius.control,
    height: 56,
    justifyContent: 'center',
  },
  label: {
    ...typography.button,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
});
