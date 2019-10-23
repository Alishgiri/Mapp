import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Label({
  icon,
  title,
  color,
  style = {},
  viewStyle = {},
  align = 'flex-start',
}) {
  return (
    <View style={[styles.inner_view, viewStyle, {justifyContent: align}]}>
      {icon}
      <Text style={[{color}, style]}>
        {icon ? ' ' : ''}
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inner_view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export {Label};
