import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing, typography } from '@/core/theme';
import { IconButton } from '@/presentation/components/common';

type BookingHeaderProps = {
  onBack: () => void;
  subtitle: string;
  title: string;
};

export function BookingHeader({ onBack, subtitle, title }: BookingHeaderProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.content}>
        <IconButton
          accessibilityLabel="Go back"
          icon={{ android: 'arrow_back', ios: 'chevron.left', web: 'arrow_back' }}
          iconSize={20}
          onPress={onBack}
          tintColor={colors.textPrimary}
        />
        <View pointerEvents="none" style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.balance} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  balance: { width: 32 },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 96,
    paddingHorizontal: spacing.lg,
  },
  copy: {
    alignItems: 'center',
    flex: 1,
  },
  safeArea: { backgroundColor: colors.surface },
  subtitle: { ...typography.caption, color: colors.primary, marginTop: 4 },
  title: { ...typography.screenTitle, color: colors.textPrimary },
});
