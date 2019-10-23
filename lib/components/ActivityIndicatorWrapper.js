import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {AppButton} from './AppButton';
import {TEXT_COLOR} from '../../utilities/constants/style-constants';
import {generateAntDesignIcon} from '../../utilities/icon-generator';

function ActivityIndicatorWrapper({style}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.text_input} />
      <AppButton
        style={style.action_button}
        title={generateAntDesignIcon('arrowright', 20, 'white')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text_input: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    color: TEXT_COLOR,
    backgroundColor: 'white',
  },
});

export default ActivityIndicatorWrapper;
