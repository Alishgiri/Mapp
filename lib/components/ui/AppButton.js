import React from 'react';
import {debounce} from 'lodash';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function AppButton({
  icon,
  title,
  onPress,
  style = {},
  innerStyle,
  titleStyle = {},
}) {
  return (
    <TouchableOpacity
      style={[styles.inner_view, style]}
      onPress={debounce(() => onPress(), 500, {
        leading: true,
        trailing: false,
      })}>
      <View style={[styles.inner_view, innerStyle]}>
        {icon}

        <Text style={titleStyle}>
          {icon ? '  ' : ''}
          {title}
        </Text>
      </View>
    </TouchableOpacity>
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
