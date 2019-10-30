import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {
  PURPLE,
  OFFWHITE,
  LIGHT_GREY,
} from '../utilities/constants/style-constants';
import {SafeArea, Label} from '../components/ui';
import BackButton from '../components/BackButton';
import {generateFontAwesomeIcon} from '../utilities/icon-generator';

export default function EventDetails({componentId, event}) {
  const {name, location, image, description} = event;
  return (
    <SafeArea>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        style={styles.image}
        source={{uri: image}}
      />
      <BackButton
        modal
        componentId={componentId}
        icon={generateFontAwesomeIcon('close')}
      />
      <View style={styles.container}>
        <Label title={name} fontWeight="bold" size={20} />
        <Label
          size={12}
          color={PURPLE}
          title={location}
          style={{marginVertical: 4}}
        />
        <Label title={description} color={LIGHT_GREY} />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: OFFWHITE,
  },
  image: {
    height: 200,
    width: '100%',
  },
  heading: {
    fontWeight: 'bold',
  },
});
