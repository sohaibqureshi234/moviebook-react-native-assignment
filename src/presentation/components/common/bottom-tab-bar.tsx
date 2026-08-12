/**
 * BottomTabBar — Shared navigation component
 *
 * Figma spec:
 *   Container: width 324, height 38, borderRadius 99 (pill), gap 8
 *   Active label:   Poppins SemiBold
 *   Inactive label: Poppins Regular
 */
import { SymbolView } from 'expo-symbols';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, typography } from '@/core/theme';

export type TabName = 'dashboard' | 'watch' | 'media' | 'more';

type TabItemData = {
  name: TabName;
  icon: { ios: string; android: string; web: string };
  label: string;
};

const TAB_ITEMS: TabItemData[] = [
  {
    name: 'dashboard',
    icon: { ios: 'square.grid.2x2.fill', android: 'apps', web: 'apps' },
    label: 'Dashboard',
  },
  {
    name: 'watch',
    icon: { ios: 'play.rectangle.fill', android: 'play_arrow', web: 'play_arrow' },
    label: 'Watch',
  },
  {
    name: 'media',
    icon: { ios: 'books.vertical.fill', android: 'video_library', web: 'video_library' },
    label: 'Media Library',
  },
  {
    name: 'more',
    icon: { ios: 'list.bullet', android: 'menu', web: 'menu' },
    label: 'More',
  },
];

type BottomTabBarProps = {
  activeTab?: TabName;
};

function TabItem({ item, active }: { item: TabItemData; active: boolean }) {
  const iconColor = active ? colors.onPrimary : colors.navigationInactive;

  return (
    <View
      accessibilityLabel={item.label}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      style={styles.tabItem}
    >
      <SymbolView name={item.icon as any} size={24} tintColor={iconColor} />
      <Text
        numberOfLines={1}
        style={[
          styles.tabLabel,
          active ? styles.tabLabelActive : styles.tabLabelInactive,
          { color: iconColor },
        ]}
      >
        {item.label}
      </Text>
    </View>
  );
}

export function BottomTabBar({ activeTab = 'watch' }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 16 }]}>
      {TAB_ITEMS.map((item) => (
        <TabItem key={item.name} item={item} active={item.name === activeTab} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.navigation,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 16,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  tabLabel: {
    textAlign: 'center',
  },
  tabLabelActive: {
    ...typography.tabActive,
    opacity: 1,
  },
  tabLabelInactive: {
    ...typography.tabInactive,
    opacity: 0.54,
  },
});
