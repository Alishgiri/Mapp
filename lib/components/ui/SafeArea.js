import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function SafeArea({children, style}) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export {SafeArea};
