import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {AppButton, Label} from '../ui';
import {
  generateEntypoIcon,
  generateMCommunityIcon,
} from '../../utilities/icon-generator';
import {
  PURPLE,
  LIGHTER_PURPLE,
  SHADOW_EFFECT,
} from '../../utilities/constants/style-constants';

function TopImageView({activeSlot, imageUrl, onAddImage, username}) {
  return (
    activeSlot === 3 && (
      <View style={styles.top_container}>
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
      </View>
    )
  );
}

const styles = StyleSheet.create({
  top_container: {
    flex: 1,
    marginBottom: 20,
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
    width: 120,
    height: 120,
    marginBottom: 5,
    borderRadius: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile_image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    ...SHADOW_EFFECT,
    shadowColor: PURPLE,
  },
});

export {TopImageView};
