import {
  View,
  Image,
  Keyboard,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';

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
    photos: null,
    eventName: '',
    imageUrl: null,
    description: '',
    isValidForm: false,
    isLoadingPhotos: false,
  };

  componentDidUpdate() {
    const {eventName, description, imageUrl, isValidForm} = this.state;
    if (
      Boolean(eventName.trim()) &&
      Boolean(description.trim()) &&
      Boolean(imageUrl)
    ) {
      if (!isValidForm) this.setState({isValidForm: true});
    } else {
      if (isValidForm) this.setState({isValidForm: false});
    }
  }

  onSelectCoverImage = debounce(
    () => {
      // ImagePicker.showImagePicker({tintColor: PURPLE}, response => {
      //   if (response.didCancel) {
      //     this.setState({isLoading: false});
      //   } else if (response.error) {
      //     this.setState({isLoading: false});
      //   } else {
      //     console.warn(response.uri);
      //     this.setState({imageUrl: response.uri});
      //   }
      // });
      this.setState({isLoadingPhotos: true});
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
        .then(r => {
          this.setState({photos: r.edges, isLoadingPhotos: false});
        })
        .catch(err => {
          //Error Loading Images
          this.setState({isLoadingPhotos: false});
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

  _renderItem = ({
    item: {
      node: {
        image: {uri},
      },
    },
  }) => (
    <TouchableWithoutFeedback onPress={() => this.coverImageSelected(uri)}>
      <Image
        source={{uri}}
        resizeMode="cover"
        style={styles.cover_image_list}
      />
    </TouchableWithoutFeedback>
  );

  coverImageSelected = uri => this.setState({imageUrl: uri, photos: null});

  render() {
    const {onClose} = this.props;
    const {photos, imageUrl, isValidForm, isLoadingPhotos} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Label title="Create Event" style={styles.header_title} />

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
          {photos ? (
            <FlatList
              data={photos}
              numColumns={3}
              style={styles.flat_list}
              renderItem={this._renderItem}
              keyExtractor={item => item.id}
            />
          ) : imageUrl ? (
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
          {isLoadingPhotos && <ActivityIndicator />}

          {isValidForm ? (
            <DoneButton
              onPress={this.createEvent}
              style={{height: 46, elevation: 10}}
            />
          ) : (
            !photos && (
              <AppButton
                onPress={onClose}
                style={styles.close_button_background}
                title={generateFontAwesomeIcon('close', 15, 'white')}
              />
            )
          )}
        </View>
      </TouchableWithoutFeedback>
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
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
  },
  flat_list: {
    height: 150,
    marginVertical: 10,
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
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cover_image: {
    width: 120,
    height: 90,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
  },
  cover_image_list: {
    height: 80,
    width: '30%',
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
  },
  close_button_background: {
    width: 50,
    height: 50,
    elevation: 5,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: PURPLE,
  },
});

export {CreateEvent};
