import React from 'react';
import {SafeAreaView, StyleSheet, KeyboardAvoidingView} from 'react-native';

function SafeArea({children, style}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={[styles.container, style]} behavior="height">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export {SafeArea};
