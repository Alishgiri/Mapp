import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';
import {View, Image, StyleSheet} from 'react-native';

import DoneButton from '../DoneButton';
import {
  PURPLE,
  LIGHT_GREY,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';
import {generateFontAwesomeIcon} from '../../utilities/icon-generator';

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
            title={generateFontAwesomeIcon('close', 15, 'white')}
          />
        </View>
        <View>
          <RoundedTextField
            placeholder="Event name"
            style={[styles.text_field, {width: '50%'}]}
            onChangeText={eventName => this.setState({eventName})}
          />
          <RoundedTextField
            multiline
            style={styles.text_field}
            placeholder="Event description"
            onChangeText={description => this.setState({description})}
          />
        </View>
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
              titleStyle={{color: LIGHT_GREY}}
              onPress={this.onSelectCoverImage}
              icon={generateFontAwesomeIcon('plus', 20, PURPLE)}
            />
          )}
        </View>

        <DoneButton
          onPress={this.createEvent}
          style={{height: 46, elevation: 10}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
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
    marginVertical: 8,
    backgroundColor: LIGHTER_PURPLE,
  },
  header_title: {
    fontSize: 24,
    marginRight: 10,
    fontWeight: 'bold',
  },
  cover_image: {
    width: 120,
    height: 90,
    borderRadius: 20,
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
