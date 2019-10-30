import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {debounce} from 'lodash';

function AppButton({icon, title, onPress, style = {}, titleStyle = {}}) {
  const content = (
    <View style={[styles.inner_view, style]}>
      {icon}

      <Text style={titleStyle}>
        {icon ? ' ' : ''}
        {title}
      </Text>
    </View>
  );
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        onPress={debounce(() => onPress(), 500, {
          leading: true,
          trailing: false,
        })}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity
      style={styles.button_background}
      onPress={debounce(() => onPress(), 500, {
        leading: true,
        trailing: false,
      })}>
      {content}
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
