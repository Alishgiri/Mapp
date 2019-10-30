import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

function AppButton({icon, title, onPress, style = {}, titleStyle = {}}) {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
      <View style={[styles.inner_view, style]}>
        {icon}

        <Text style={titleStyle}>
          {icon ? ' ' : ''}
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inner_view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export {AppButton};
