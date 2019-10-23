import React from 'react';
import {View, TextInput, StyleSheet, ActivityIndicator} from 'react-native';

import {AppButton} from './AppButton';
import {
  PURPLE,
  TEXT_COLOR,
  PURPLE_LIGHT,
  SHADOW_EFFECT,
} from '../../utilities/constants/style-constants';
import {generateAntDesignIcon} from '../../utilities/icon-generator';

function TextFieldWithButton({style, onPress, busyIndicator, ...rest}) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.container, style]}>
        <TextInput style={styles.text_input} {...rest} />
        {busyIndicator ? (
          <ActivityIndicator color={PURPLE} style={styles.activity_indicator} />
        ) : (
          <AppButton
            onPress={onPress}
            style={styles.action_button}
            title={generateAntDesignIcon('arrowright', 20, 'white')}
          />
        )}
      </View>
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
  activity_indicator: {
    right: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
});

export {TextFieldWithButton};
