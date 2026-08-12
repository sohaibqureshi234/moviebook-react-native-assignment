/**
 * IconButton — Accessible pressable icon button.
 *
 * Provides a minimum 44×44 touch target (WCAG / Apple HIG requirement) while
 * keeping the visual icon at whatever size is specified.
 *
 * Usage:
 *   <IconButton
 *     icon="xmark"
 *     iconSize={30}           // visual size of the SF Symbol / icon
 *     onPress={handleClose}
 *     accessibilityLabel="Close search"
 *   />
 */
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@/core/theme';

type SymbolName = {
  ios: string;
  android: string;
  web: string;
};

type IconButtonProps = {
  icon: SymbolName;
  iconSize?: number;
  tintColor?: string;
  onPress: () => void;
  accessibilityLabel: string;
  /** Minimum touch target dimension. Defaults to 44 (WCAG AA). */
  touchTargetSize?: number;
};

export function IconButton({
  icon,
  iconSize = 24,
  tintColor = colors.textPrimary,
  onPress,
  accessibilityLabel,
  touchTargetSize = 44,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.touchTarget,
        { width: touchTargetSize, height: touchTargetSize },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.center}>
        <SymbolView name={icon as any} size={iconSize} tintColor={tintColor} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchTarget: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
