import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

export const MAX_WIDTH = Dimensions.get('window').width; // Get width dimension for view zone.
export const MAX_HEIGHT = Dimensions.get('window').height; // Get height dimension for view zone.

const FIGMA_HEIGHT = 852; // Base on design
const FIGMA_WIDTH = 393; // Base on design

const wScale = Dimensions.get('screen').width / FIGMA_WIDTH;
const hScale = Dimensions.get('screen').height / FIGMA_HEIGHT;

/**
 * @param size number of pixels
 * @param based is width or height and default is width
 * @returns pixels responsive
 */
export function normalize(size: number, based: 'width' | 'height' = 'width') {
  const newSize = based === 'height' ? size * hScale : size * wScale;

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
