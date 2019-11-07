import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Label} from '../ui';
import {PURPLE, FONT_XXS} from '../../utilities/constants/style-constants';

export default function Circle({style, size, title, sub, color, coordinates}) {
  return (
    <View style={[styles.floating_view(size, coordinates, color), style]}>
      <Label color="white" title={title} fontWeight="bold" />
      {sub && <Label title={sub} style={styles.sub_title} />}
    </View>
  );
}

const styles = StyleSheet.create({
  floating_view: function(size, coordinates, color) {
    return {
      width: size,
      height: size,
      ...coordinates,
      position: 'absolute',
      alignItems: 'center',
      borderRadius: size / 2,
      justifyContent: 'center',
      backgroundColor: color || PURPLE,
    };
  },
  sub_title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FONT_XXS - 2,
  },
});
