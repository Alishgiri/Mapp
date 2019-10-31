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
    />
  );
}

const styles = StyleSheet.create({
  menu_button_background: {
    top: 20,
    right: 20,
    minHeight: 30,
    paddingVertical: 6,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
