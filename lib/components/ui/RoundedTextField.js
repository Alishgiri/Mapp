import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {TEXT_COLOR} from '../../utilities/constants/style-constants';

function RoundedTextField({style, leftIcon, busyIndicator, ...rest}) {
  return (
    <View style={[styles.container, style]}>
      {leftIcon}
      <TextInput style={styles.text_input} {...rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  text_input: {
    width: '100%',
    height: '100%',
    color: TEXT_COLOR,
  },
});

export {RoundedTextField};
