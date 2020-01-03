import React from 'react';
import {Image, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {AppButton, Label} from '../ui';
import {
  generateEntypoIcon,
  generateMCommunityIcon,
} from '../../utilities/icon-generator';
import {
  PURPLE,
  SHADOW_EFFECT,
  getDimentions,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';

const W = getDimentions().width / 3;

function TopImageView({style, image, imageUrl, onAddImage, username}) {
  return (
    <Animated.View style={[styles.top_container, style]}>
      <LinearGradient
        style={styles.picture_container}
        colors={[LIGHTER_PURPLE, '#F2F2F2']}>
        {imageUrl ? (
          <Image
            resizeMode="cover"
            source={{uri: imageUrl}}
            style={styles.profile_image}
          />
        ) : (
          <AppButton
            onPress={onAddImage}
            style={styles.add_button}
            title={generateEntypoIcon('plus', 20, PURPLE)}
          />
        )}
        {imageUrl && (
          <AppButton
            onPress={onAddImage}
            style={styles.fab_edit_button}
            title={generateMCommunityIcon('circle-edit-outline', 20, PURPLE)}
          />
        )}
      </LinearGradient>
      <Label
        align="center"
        style={styles.add_photo}
        title={imageUrl ? username : 'Add Photo'}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  top_container: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_photo: {
    bottom: -20,
    position: 'absolute',
  },
  add_button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    ...SHADOW_EFFECT,
    backgroundColor: 'white',
  },
  fab_edit_button: {
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    ...SHADOW_EFFECT,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: 'white',
  },
  picture_container: {
    width: W,
    height: W,
    marginBottom: 5,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: W / 2,
    justifyContent: 'center',
  },
  profile_image: {
    width: W,
    height: W,
    borderRadius: W / 2,
    ...SHADOW_EFFECT,
    shadowColor: PURPLE,
  },
});

export {TopImageView};
