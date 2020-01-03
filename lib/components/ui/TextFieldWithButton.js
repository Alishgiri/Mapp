import React from 'react';
import {View, TextInput, StyleSheet, ActivityIndicator} from 'react-native';

import {AppButton} from './AppButton';
import {
  PURPLE,
  FONT_XXS,
  LIGHT_GREY,
  SHADOW_EFFECT,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {generateAntDesignIcon} from '../../utilities/icon-generator';

function TextFieldWithButton({
  code,
  style,
  onPress,
  hideButton,
  busyIndicator,
  onSearchCountryCode,
  ...rest
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.container, style]}>
        <TextInput
          style={[styles.text_input, code ? {paddingLeft: 60} : {}]}
          {...rest}
        />
        {code && (
          <AppButton
            title={code || 'code'}
            onPress={onSearchCountryCode}
            style={styles.country_code_button}
            titleStyle={styles.country_code_button_title}
          />
        )}
        {busyIndicator ? (
          <ActivityIndicator color={PURPLE} style={styles.activity_indicator} />
        ) : (
          !hideButton && (
            <AppButton
              onPress={onPress}
              style={styles.action_button}
              title={generateAntDesignIcon('arrowright', 20, 'white')}
            />
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input: {
    height: 60,
    width: '100%',
    color: 'black',
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: LIGHTER_PURPLE,
  },
  action_button: {
    right: 0,
    width: 58,
    height: 58,
    borderRadius: 30,
    ...SHADOW_EFFECT,
    elevation: 5,
    shadowColor: PURPLE,
    position: 'absolute',
    backgroundColor: PURPLE,
  },
  activity_indicator: {
    right: 20,
    elevation: 10,
    alignSelf: 'center',
    position: 'absolute',
  },
  country_code_button: {
    left: 10,
    height: 30,
    elevation: 6,
    minWidth: 40,
    borderRadius: 10,
    position: 'absolute',
    paddingHorizontal: 4,
    backgroundColor: LIGHTER_PURPLE,
  },
  country_code_button_title: {
    color: LIGHT_GREY,
    fontSize: FONT_XXS,
  },
});

export {TextFieldWithButton};
