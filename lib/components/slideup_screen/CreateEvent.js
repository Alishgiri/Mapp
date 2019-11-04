import {
  View,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';

import DoneButton from '../DoneButton';
import {
  PURPLE,
  LIGHT_GREY,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';
import {
  generateFontAwesomeIcon,
  generateMaterialIcon,
} from '../../utilities/icon-generator';

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
      this.setState({
        photos: [
          'https://thumbs.dreamstime.com/b/backlit-dutch-windmill-sunrise-44957711.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm11qyz_tYUa68E8djDOWojC9H8LAgjDpAd8hrlFQkHsJNB-7k&s',
          'https://img5.goodfon.com/wallpaper/nbig/f/43/solntse-priroda-voskhod-trava-rastenie-utro-rassvet-siluet-r.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUD9fycQ2gcsP5kA8FkVlwwHtsPHLTTiOdYKIdiw_u-fxRQGxyA&s',
          'https://images.hdqwalls.com/wallpapers/bthumb/horizon-zero-dawn-nature-mountains-trees-sky-4k-yj.jpg',
        ],
      });
    },
    500,
    {leading: true, trailing: false},
  );

  onUploadImage = debounce(
    () => {
      ImagePicker.showImagePicker({tintColor: PURPLE}, response => {
        if (response.didCancel) {
          this.setState({isLoading: false});
        } else if (response.error) {
          this.setState({isLoading: false});
        } else {
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

  _renderItem = () => {
    const {photos} = this.state;
    return photos.map(url => (
      <TouchableWithoutFeedback onPress={() => this.coverImageSelected(url)}>
        <Image
          resizeMode="cover"
          source={{uri: url}}
          style={styles.cover_image_list}
        />
      </TouchableWithoutFeedback>
    ));
  };

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
          {photos && !imageUrl ? (
            <ScrollView
              horizontal
              style={styles.scroll_view}
              contentContainerStyle={{width: '100%', flexWrap: 'wrap'}}>
              <AppButton
                title="Upload"
                onPress={this.onUploadImage}
                style={styles.cover_image_list}
                titleStyle={{color: LIGHT_GREY}}
                innerStyle={{flexDirection: 'column'}}
                icon={generateMaterialIcon('file-upload', 20, PURPLE)}
              />
              {this._renderItem()}
            </ScrollView>
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
              innerStyle={{flexDirection: 'column'}}
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
  scroll_view: {
    height: 150,
    width: '100%',
    marginTop: 10,
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
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
  },
  cover_image_list: {
    height: 80,
    width: '30%',
    marginLeft: 10,
    marginBottom: 10,
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
