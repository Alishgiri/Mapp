import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';
import {View, Image, StyleSheet} from 'react-native';

import {
  PURPLE,
  SHADOW_EFFECT,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';
import {generateFontAwesomeIcon} from '../../utilities/icon-generator';

class CreateEvent extends React.Component {
  state = {imageUrl: null};

  onSelectCoverImage = debounce(
    () => {
      ImagePicker.showImagePicker({tintColor: PURPLE}, response => {
        if (response.didCancel) {
          this.setState({isLoading: false});
        } else if (response.error) {
          this.setState({isLoading: false});
        } else {
          console.warn(response.uri);
          this.setState({imageUrl: response.uri});
        }
      });
    },
    500,
    {leading: true, trailing: false},
  );

  render() {
    const {onClose} = this.props;
    const {imageUrl} = this.state;
    return (
      <View style={styles.container}>
        <Label title="Create Event" style={styles.header_title} />
        <RoundedTextField placeholder="Event name" style={styles.text_field} />
        <RoundedTextField
          multiline
          placeholder="Description"
          style={[styles.text_field, {height: 60}]}
        />
        <View>
          {imageUrl ? (
            <Image
              resizeMode="cover"
              source={{uri: imageUrl}}
              style={styles.cover_image}
            />
          ) : (
            <AppButton
              title="Add Cover"
              style={styles.cover_image}
              onPress={this.onSelectCoverImage}
              icon={generateFontAwesomeIcon('plus', 20, PURPLE)}
            />
          )}
        </View>
        <AppButton
          onPress={onClose}
          style={styles.close_button_background}
          title={generateFontAwesomeIcon('close', 20, 'white')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-between',
  },
  text_field: {
    height: 40,
    width: '100%',
    marginVertical: 12,
    backgroundColor: LIGHTER_PURPLE,
  },
  header_title: {
    fontSize: 24,
    marginRight: 10,
    fontWeight: 'bold',
  },
  cover_image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    ...SHADOW_EFFECT,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
  },
  close_button_background: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: PURPLE,
  },
});

export {CreateEvent};