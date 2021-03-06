import {
  View,
  Image,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';

import DoneButton from '../DoneButton';
import {
  generateMaterialIcon,
  generateFontAwesomeIcon,
} from '../../utilities/icon-generator';
import {
  PURPLE,
  LIGHT_GREY,
  getDimentions,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';

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
      const photos = [
        '',
        'https://thumbs.dreamstime.com/b/backlit-dutch-windmill-sunrise-44957711.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm11qyz_tYUa68E8djDOWojC9H8LAgjDpAd8hrlFQkHsJNB-7k&s',
        'https://img5.goodfon.com/wallpaper/nbig/f/43/solntse-priroda-voskhod-trava-rastenie-utro-rassvet-siluet-r.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUD9fycQ2gcsP5kA8FkVlwwHtsPHLTTiOdYKIdiw_u-fxRQGxyA&s',
        'https://images.hdqwalls.com/wallpapers/bthumb/horizon-zero-dawn-nature-mountains-trees-sky-4k-yj.jpg',
        'https://thumbs.dreamstime.com/b/backlit-dutch-windmill-sunrise-44957711.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm11qyz_tYUa68E8djDOWojC9H8LAgjDpAd8hrlFQkHsJNB-7k&s',
        'https://img5.goodfon.com/wallpaper/nbig/f/43/solntse-priroda-voskhod-trava-rastenie-utro-rassvet-siluet-r.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUD9fycQ2gcsP5kA8FkVlwwHtsPHLTTiOdYKIdiw_u-fxRQGxyA&s',
        'https://images.hdqwalls.com/wallpapers/bthumb/horizon-zero-dawn-nature-mountains-trees-sky-4k-yj.jpg',
      ];
      this.setState({photos});
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

  _renderItem = ({item, index}) => {
    if (index === 0) {
      return (
        <AppButton
          title="Upload"
          onPress={this.onUploadImage}
          style={styles.cover_image_list}
          titleStyle={{color: LIGHT_GREY}}
          innerStyle={{flexDirection: 'column'}}
          icon={generateMaterialIcon('file-upload', 20, PURPLE)}
        />
      );
    }
    return this._clickableImage(item);
  };

  _clickableImage = imageUrl => (
    <TouchableWithoutFeedback onPress={() => this.coverImageSelected(imageUrl)}>
      <Image
        resizeMode="cover"
        source={{uri: imageUrl}}
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
          <View>
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
              <FlatList
                numColumns={3}
                data={this.state.photos}
                style={styles.flat_list}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => `${index}`}
              />
            ) : imageUrl ? (
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({imageUrl: null}, this.onSelectCoverImage)
                }>
                <Image
                  resizeMode="cover"
                  source={{uri: imageUrl}}
                  style={styles.cover_image}
                />
              </TouchableWithoutFeedback>
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
          </View>
          {isValidForm ? (
            <DoneButton onPress={this.createEvent} style={styles.done_button} />
          ) : (
            <AppButton
              onPress={onClose}
              style={styles.close_button_background}
              title={generateFontAwesomeIcon('close', 15, 'white')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const W = getDimentions().width / 3 - 25;
const H = getDimentions().height / 10 - 5;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    marginVertical: 5,
    backgroundColor: LIGHTER_PURPLE,
  },
  header_title: {
    fontSize: 24,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  cover_image: {
    width: 140,
    height: 110,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
  },
  flat_list: {
    marginTop: 10,
    marginBottom: 0,
    height: H * 2 + 10,
  },
  cover_image_list: {
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
    width: W,
    height: H,
  },
  close_button_background: {
    width: 40,
    height: 40,
    elevation: 5,
    marginTop: 5,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: PURPLE,
  },
  done_button: {
    bottom: 15,
    height: 46,
    elevation: 10,
    position: 'absolute',
  },
});

export {CreateEvent};
