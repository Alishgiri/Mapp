import React from 'react';
import {StyleSheet} from 'react-native';

import {AppButton} from './ui';
import {generateAntDesignIcon} from '../utilities/icon-generator';
import {PURPLE_LIGHT} from '../utilities/constants/style-constants';

export default function MenuButton({onPress, style}) {
  return (
    <AppButton
      onPress={onPress}
      style={[styles.menu_button_background, style]}
      title={generateAntDesignIcon('menu-unfold', 20, PURPLE_LIGHT)}
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
