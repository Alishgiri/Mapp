import React from 'react';
import {View, StyleSheet} from 'react-native';

import {AppButton} from '../ui';
import {generateMaterialIcon} from '../../utilities/icon-generator';
import {PURPLE, SHADOW_EFFECT} from '../../utilities/constants/style-constants';

function ChatFooter() {
  return (
    <View style={styles.container}>
      <View style={styles.user_typing_indicator}>
        <View style={styles.circle_one} />
        <View style={styles.circle_two} />
        <View style={styles.circle_three} />
      </View>
      <AppButton
        style={styles.scroll_down_button}
        title={generateMaterialIcon('keyboard-arrow-down', 25, PURPLE)}
      />
      <View style={styles.balancing_view} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  user_typing_indicator: {
    width: 100,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: PURPLE,
    justifyContent: 'center',
    borderBottomLeftRadius: 0,
  },
  circle_one: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  circle_two: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'white',
  },
  circle_three: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  scroll_down_button: {
    width: 40,
    height: 40,
    ...SHADOW_EFFECT,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  balancing_view: {width: 100},
});

export {ChatFooter};
