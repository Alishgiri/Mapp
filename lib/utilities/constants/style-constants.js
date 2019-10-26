import {Dimensions} from 'react-native';

export const FONT_XS = 14;
export const FONT_SM = 16;
export const FONT_MD = 18;
export const FONT_LG = 20;

export const OFFWHITE = '#eee';
export const ORANGE = '#f9a24a';
export const PURPLE = '#7360ff';
export const TEXT_COLOR = '#333333';
export const LIGHT_GREY = '#848784';
export const PURPLE_LIGHT = '#aaa7c8';
export const LIGHTER_PURPLE = '#f1f0ff'; //'#e0dff2';

export const SHADOW_EFFECT = {
  elevation: 2,
  shadowRadius: 3,
  shadowOpacity: 0.5,
  shadowColor: '#ccc',
  shadowOffset: {width: 2, height: 2},
};

export function getDimentions() {
  return Dimensions.get('window');
}
