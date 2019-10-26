import React from 'react';
import {StyleSheet} from 'react-native';

import {AppButton} from './ui';
import {PURPLE, SHADOW_EFFECT} from '../utilities/constants/style-constants';

export default function DoneButton({onPress}) {
  return (
    <AppButton
      title="DONE"
      onPress={onPress}
      style={styles.done_button}
      titleStyle={styles.button_title}
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
