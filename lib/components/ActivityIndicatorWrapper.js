import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const ActivityIndicatorWrapper = ({check, children}) => (
  <View style={styles.container}>
    {check ? <ActivityIndicator /> : children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
});

export default ActivityIndicatorWrapper;
