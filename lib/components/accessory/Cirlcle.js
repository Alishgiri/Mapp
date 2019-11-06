import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Label} from '../ui';
import {PURPLE} from '../../utilities/constants/style-constants';

export default function Circle({style, size, title, coordinates}) {
  return (
    <View style={[styles.floating_view(size, coordinates), style]}>
      <Label color="white" title={title} fontWeight="bold" />
    </View>
  );
}

const styles = StyleSheet.create({
  floating_view: function(size, coordinates) {
    return {
      width: size,
      height: size,
      ...coordinates,
      position: 'absolute',
      alignItems: 'center',
      borderRadius: size / 2,
      backgroundColor: PURPLE,
      justifyContent: 'center',
    };
  },
});
