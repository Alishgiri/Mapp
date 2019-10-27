import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Label} from '../ui';
import {splitDateTime} from '../../utilities/handle-date-time';
import {PURPLE, PURPLE_LIGHT} from '../../utilities/constants/style-constants';

function MessageBubble({position, currentMessage}) {
  const fragment = splitDateTime(currentMessage.createdAt);
  return position === 'left' ? (
    <View style={styles.container}>
      <View style={[styles.bubble(PURPLE), {borderBottomLeftRadius: 0}]}>
        <Label color="white" title={currentMessage.text} />
      </View>
      <Label
        style={styles.subtitle_left}
        title={`${currentMessage.user.name}  ${fragment.time}`}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={[styles.bubble('#e8eaf1'), {borderBottomRightRadius: 0}]}>
        <Label color="black" title={currentMessage.text} />
      </View>
      <Label
        align="flex-end"
        title={fragment.time}
        style={styles.subtitle_right}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {maxWidth: '70%'},
  bubble: function(backgroundColor) {
    return {
      padding: 20,
      backgroundColor,
      borderRadius: 30,
    };
  },
  subtitle_left: {
    marginTop: 5,
    color: PURPLE_LIGHT,
  },
  subtitle_right: {
    marginTop: 5,
    textAlign: 'right',
    color: PURPLE_LIGHT,
  },
});

export {MessageBubble};
