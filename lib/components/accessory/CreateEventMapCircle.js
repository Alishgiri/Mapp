import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Label} from '../ui';
import Circle from './Cirlcle';
import {TEXT_COLOR, FONT_XXS} from '../../utilities/constants/style-constants';

export default function CreateEventMapCircle({}) {
  return (
    <View style={styles.outer_circle}>
      <View style={styles.dotted_circle}>
        <View style={styles.mid_circle}>
          <View style={styles.inner_circle}>
            <Circle size={20} />
          </View>
        </View>
      </View>
      <View style={styles.radius_arm}>
        <Label title="350 m" style={styles.arm_label} />
        <View style={styles.arm_right_circle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer_circle: {
    top: 40,
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotted_circle: {
    width: 170,
    height: 170,
    borderWidth: 2.5,
    borderRadius: 85,
    alignItems: 'center',
    borderStyle: 'dotted',
    borderColor: '#c9c7eb',
    justifyContent: 'center',
  },
  mid_circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  inner_circle: {
    width: 60,
    height: 60,
    elevation: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  radius_arm: {
    right: -2,
    width: 92,
    height: 1.2,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: TEXT_COLOR,
  },
  arm_label: {
    left: -15,
    bottom: 0,
    fontSize: FONT_XXS,
    fontWeight: 'bold',
    position: 'absolute',
  },
  arm_right_circle: {
    width: 5,
    right: -2,
    height: 5,
    bottom: -2,
    borderRadius: 3,
    position: 'absolute',
    backgroundColor: TEXT_COLOR,
  },
});
