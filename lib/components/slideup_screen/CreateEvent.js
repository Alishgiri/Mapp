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
import DoneButton from '../DoneButton';

class CreateEvent extends React.Component {
  state = {
    eventName: '',
    imageUrl: null,
    description: '',
  };

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

  createEvent = () => {
    const {eventName, imageUrl, description} = this.state;
    this.props.saveEvent({
      description,
      name: eventName || '',
      image: imageUrl || '',
      id: this.props.eventsCount,
      location: 'Padsobka, Posta veche',
    });
    this.props.onClose();
  };

  render() {
    const {onClose} = this.props;
    const {imageUrl} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Label title="Create Event" style={styles.header_title} />
          <AppButton
            onPress={onClose}
            style={styles.close_button_background}
            title={generateFontAwesomeIcon('close', 20, 'white')}
          />
        </View>
        <RoundedTextField
          placeholder="Event name"
          style={styles.text_field}
          onChangeText={eventName => this.setState({eventName})}
        />
        <RoundedTextField
          multiline
          placeholder="Description"
          style={[styles.text_field, {height: 60}]}
          onChangeText={description => this.setState({description})}
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

        <DoneButton style={{height: 40}} onPress={this.createEvent} />
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
  header: {
    flexDirection: 'row',
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
    width: 30,
    height: 30,
    borderRadius: 15,
    alignSelf: 'center',
    backgroundColor: PURPLE,
  },
});

export {CreateEvent};
