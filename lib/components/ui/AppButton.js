import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

function AppButton({title, onPress, style = {}, titleStyle = {}}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={style}>
        <Text style={titleStyle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export {AppButton};
