import { Platform } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { colors } from './colors';

const defaultFontSize = 14;
const defaultFontColor = colors.black;

export const miniPlayerSetting = {
  height: 50,
  paddingBottom: getBottomSpace(),
  titleFontSize: defaultFontSize,
  subtitleFontSize: 12,
};

export const playlistSetting = {
  briefTitleFontSize: 12,
  briefTitleColor: defaultFontColor,
};

export const modalPlayerSetting = {
  paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  paddingBottom: getBottomSpace(),
};

export const animationSetting = {
  transitionTime: 200,
};
