import React from 'react';
import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {AppButton} from './ui';
import {generateIonicon} from '../utilities/icon-generator';
import {SHADOW_EFFECT} from '../utilities/constants/style-constants';

export default function BackButton({icon, componentId, modal}) {
  return (
    <AppButton
      style={styles.back_button}
      onPress={() => {
        if (modal) Navigation.dismissModal(componentId);
        else Navigation.pop(componentId);
      }}
      title={icon || generateIonicon('ios-arrow-round-back', 35)}
    />
  );
}

const styles = StyleSheet.create({
  back_button: {
    left: 0,
    top: 20,
    minHeight: 30,
    ...SHADOW_EFFECT,
    position: 'absolute',
    paddingHorizontal: 20,
    borderTopRightRadius: 30,
    backgroundColor: '#f8f8f8',
    borderBottomRightRadius: 30,
  },
});
