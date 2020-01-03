import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PURPLE, PURPLE_LIGHT} from '../utilities/constants/style-constants';

function PageIndicator({activePage, style}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.indicator(activePage === 1)} />
      <View style={styles.indicator(activePage === 2)} />
      <View style={styles.indicator(activePage === 3)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: function(active) {
    return {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: active ? PURPLE : PURPLE_LIGHT,
    };
  },
});

export default PageIndicator;
