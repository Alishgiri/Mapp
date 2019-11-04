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
      <Text
        style={[
          {
            fontWeight,
            fontSize: size,
            color: color || TEXT_COLOR,
            fontFamily: 'NunitoSans-Regular',
          },
          style,
        ]}>
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
