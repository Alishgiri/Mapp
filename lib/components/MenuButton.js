import React from 'react';
import {StyleSheet} from 'react-native';

import {AppButton} from './ui';
import {LIGHT_GREY} from '../utilities/constants/style-constants';
import {generateAntDesignIcon} from '../utilities/icon-generator';

export default function MenuButton({onPress, style}) {
  return (
    <AppButton
      onPress={onPress}
      style={[styles.menu_button_background, style]}
      title={generateAntDesignIcon('menu-unfold', 20, LIGHT_GREY)}
    />
  );
}

const styles = StyleSheet.create({
  menu_button_background: {
    top: 20,
    right: 20,
    paddingVertical: 6,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
