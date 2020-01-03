import React from 'react';
import {debounce} from 'lodash';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  ORANGE,
  FONT_MD,
  getDimentions,
} from '../utilities/constants/style-constants';

const W = getDimentions().width / 2;

const Fab = ({title, style, titleStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={debounce(() => onPress(), 500, {
        leading: true,
        trailing: false,
      })}>
      <Text style={[styles.titleStyle, titleStyle]}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: W,
    height: W,
    right: -W / 2,
    bottom: -W / 2,
    position: 'absolute',
    borderRadius: W / 2,
    backgroundColor: ORANGE,
  },
  titleStyle: {
    top: 0,
    left: 0,
    color: 'white',
    margin: W / 4.8,
    fontSize: FONT_MD,
    fontWeight: 'bold',
    position: 'absolute',
  },
});

export default Fab;
