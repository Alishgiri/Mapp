import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Label} from '../ui';
import {splitDateTime} from '../../utilities/handle-date-time';

function DayDisplayer({Component, props}) {
  if (props.currentMessage.createdAt) {
    const fragment = splitDateTime(props.currentMessage.createdAt);

    return (
      <Component {...props}>
        <View style={styles.container}>
          <Label title={fragment.shortDate} />
        </View>
      </Component>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 'auto',
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});

export {DayDisplayer};
