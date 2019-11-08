import React from 'react';
import {View, StyleSheet} from 'react-native';

import {generateMaterialIcon} from '../../utilities/icon-generator';
import {ORANGE, SHADOW_EFFECT} from '../../utilities/constants/style-constants';

function SendButton({Component, onPress, ...rest}) {
  return (
    <Component
      {...rest}
      onPress={onPress}
      containerStyle={styles.container_styles}>
      <View style={styles.send_button}>
        {generateMaterialIcon('send', 20, 'white')}
      </View>
    </Component>
  );
}

const styles = StyleSheet.create({
  container_styles: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  send_button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    ...SHADOW_EFFECT,
    elevation: 5,
    shadowColor: ORANGE,
    alignItems: 'center',
    backgroundColor: ORANGE,
    justifyContent: 'center',
  },
});

export {SendButton};
