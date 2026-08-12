/**
 * Responsive scaling utilities
 *
 * Provides dimension-aware scaling so UI stays proportional across different
 * device sizes. Base reference is 375px wide (iPhone SE / 14 Pro logical pts).
 *
 * Usage:
 *   import { moderateScale, verticalScale } from '@/core/utils/scale';
 *   fontSize: moderateScale(16)    // scales gently
 *   height: verticalScale(56)      // scales with device height
 */
import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthScale = SCREEN_WIDTH / BASE_WIDTH;
const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;

/**
 * Scales a value linearly with screen width.
 * Use for horizontal dimensions (padding, margin, width).
 */
export function scale(size: number): number {
  return Math.round(PixelRatio.roundToNearestPixel(size * widthScale));
}

/**
 * Scales a value linearly with screen height.
 * Use for vertical dimensions (height, vertical padding).
 */
export function verticalScale(size: number): number {
  return Math.round(PixelRatio.roundToNearestPixel(size * heightScale));
}

/**
 * Moderately scales a value — less aggressive than full linear scaling.
 * Recommended for font sizes and most UI elements.
 *
 * @param size   The base size (designed for 375pt width)
 * @param factor Scaling strength: 0 = no scaling, 1 = full linear. Default 0.5.
 */
export function moderateScale(size: number, factor = 0.5): number {
  return Math.round(
    PixelRatio.roundToNearestPixel(size + (size * widthScale - size) * factor),
  );
}

/**
 * Moderately scales based on screen HEIGHT.
 */
export function moderateVerticalScale(size: number, factor = 0.5): number {
  return Math.round(
    PixelRatio.roundToNearestPixel(size + (size * heightScale - size) * factor),
  );
}
