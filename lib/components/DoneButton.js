import React from 'react';
import {StyleSheet} from 'react-native';

import {AppButton} from './ui';
import {PURPLE, SHADOW_EFFECT} from '../utilities/constants/style-constants';

export default function DoneButton({onPress, align = 'center', style}) {
  return (
    <AppButton
      title="DONE"
      onPress={onPress}
      titleStyle={styles.button_title}
      style={[styles.done_button, {alignSelf: align}, style]}
    />
  );
}

const styles = StyleSheet.create({
  done_button: {
    padding: 20,
    width: '80%',
    ...SHADOW_EFFECT,
    borderRadius: 30,
    shadowColor: PURPLE,
    backgroundColor: PURPLE,
  },
  button_title: {
    color: 'white',
    fontWeight: 'bold',
  },
});
