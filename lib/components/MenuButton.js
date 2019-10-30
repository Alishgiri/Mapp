import React from 'react';
import {StyleSheet} from 'react-native';

import {AppButton} from './ui';
import {generateAntDesignIcon} from '../utilities/icon-generator';

export default function MenuButton({onPress, style}) {
  return (
    <AppButton
      onPress={onPress}
      title={generateAntDesignIcon('menu-unfold')}
      style={[styles.menu_button_background, style]}
      hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
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
