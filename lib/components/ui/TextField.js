import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {AppButton} from './AppButton';
import {
  PURPLE,
  TEXT_COLOR,
  SHADOW_EFFECT,
  PURPLE_LIGHT,
} from '../../utilities/constants/style-constants';
import {generateAntDesignIcon} from '../../utilities/icon-generator';

function TextField({style, onPress, ...rest}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.text_input} {...rest} />
      <AppButton
        onPress={onPress}
        style={styles.action_button}
        title={generateAntDesignIcon('arrowright', 20, 'white')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    ...SHADOW_EFFECT,
    shadowRadius: 8,
    color: TEXT_COLOR,
    shadowOpacity: 0.2,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    shadowColor: PURPLE_LIGHT,
  },
  action_button: {
    right: 0,
    width: 54,
    height: 54,
    borderRadius: 27,
    ...SHADOW_EFFECT,
    shadowColor: PURPLE,
    position: 'absolute',
    backgroundColor: PURPLE,
  },
});

export {TextField};
