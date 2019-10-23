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
        {generateMaterialIcon('send', 25, 'white')}
      </View>
    </Component>
  );
}

const styles = StyleSheet.create({
  container_styles: {
    width: 'auto',
    height: 'auto',
  },
  send_button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    ...SHADOW_EFFECT,
    shadowColor: ORANGE,
    alignItems: 'center',
    backgroundColor: ORANGE,
    justifyContent: 'center',
  },
});

export {SendButton};
