import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TEXT_COLOR} from '../../utilities/constants/style-constants';

function Label({
  icon,
  title,
  size,
  color,
  fontWeight,
  style = {},
  viewStyle = {},
  align = 'flex-start',
}) {
  return (
    <View style={[styles.inner_view, viewStyle, {justifyContent: align}]}>
      {icon}
      <Text style={[{color, fontSize: size, fontWeight}, style]}>
        {icon ? ' ' : ''}
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inner_view: {
    color: TEXT_COLOR,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export {Label};
