import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PURPLE, PURPLE_LIGHT} from '../utilities/constants/style-constants';

function PageIndicator({activePage}) {
  return (
    <View style={styles.container}>
      <View style={styles.indicator(activePage === 0)} />
      <View style={styles.indicator(activePage === 1)} />
      <View style={styles.indicator(activePage === 2)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: function(active) {
    return {
      height: 8,
      borderRadius: 4,
      width: active ? 14 : 8,
      backgroundColor: active ? PURPLE : PURPLE_LIGHT,
    };
  },
});

export default PageIndicator;
