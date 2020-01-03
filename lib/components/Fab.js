import React from 'react';
import {debounce} from 'lodash';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
  ORANGE,
  FONT_MD,
  getDimentions,
} from '../utilities/constants/style-constants';

const W = getDimentions().width / 2;

const Fab = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={debounce(() => onPress(), 500, {
        leading: true,
        trailing: false,
      })}>
      <Text style={styles.titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: W,
    height: W,
    padding: 20,
    right: -W / 2,
    bottom: -W / 2,
    position: 'absolute',
    borderRadius: W / 2,
    backgroundColor: ORANGE,
  },
  titleStyle: {
    top: W / 4,
    left: W / 4,
    color: 'white',
    fontSize: FONT_MD,
    fontWeight: 'bold',
    position: 'absolute',
  },
});

export default Fab;
