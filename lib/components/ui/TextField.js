import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {AppButton} from './AppButton';
import {generateAntDesignIcon} from '../../utilities/icon-generator';
import {
  TEXT_COLOR,
  PURPLE,
  SHADOW_EFFECT,
} from '../../utilities/constants/style-constants';

function TextField({style}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.text_input} />
      <AppButton
        style={styles.action_button}
        title={generateAntDesignIcon('arrowright', 20, 'white')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text_input: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    color: TEXT_COLOR,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  action_button: {
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    ...SHADOW_EFFECT,
    shadowColor: PURPLE,
    position: 'absolute',
    backgroundColor: PURPLE,
  },
});

export {TextField};
