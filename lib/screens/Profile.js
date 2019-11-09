import {
  View,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';

import BackButton from '../components/BackButton';
import DoneButton from '../components/DoneButton';
import {SafeArea, RoundedTextField} from '../components/ui';
import {PURPLE} from '../utilities/constants/style-constants';
import {TopImageView} from '../components/join_us/TopImageView';
import AutoCompleteTextField from '../components/AutoCompleteTextField';

class Profile extends React.Component {
  state = {
    imageUrl: null,
    selectedCountry: '',
    countries: [
      {id: 0, name: 'Country'},
      {id: 1, name: 'Country'},
      {id: 2, name: 'Country'},
      {id: 3, name: 'Country'},
      {id: 4, name: 'Country'},
      {id: 5, name: 'Country'},
      {id: 6, name: 'Country'},
      {id: 7, name: 'Country'},
      {id: 8, name: 'Country'},
      {id: 9, name: 'Country'},
      {id: 10, name: 'Country'},
    ],
  };

  pickProfilePicture = debounce(
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
    const {imageUrl, countries, selectedCountry} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <BackButton componentId={this.props.componentId} />
          <TopImageView
            imageUrl={imageUrl}
            style={styles.top_image}
            onAddImage={this.pickProfilePicture}
          />
          <View style={styles.bottom_view}>
            <View style={styles.textfield_group}>
              <RoundedTextField
                placeholder="Username"
                style={styles.text_field}
              />
              <AutoCompleteTextField
                data={countries}
                // align={}
                // invalid={}
                compareKey="name"
                value={selectedCountry}
                style={styles.text_field}
                placeholder="Select location"
                selected={sc =>
                  this.setState({selectedCountry: sc}, console.warn(sc))
                }
              />
            </View>
            <DoneButton onPress={() => {}} style={styles.done_button} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top_image: {
    margin: 40,
    height: '30%',
  },
  bottom_view: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textfield_group: {
    width: '100%',
    alignItems: 'center',
  },
  text_field: {
    width: '80%',
    marginVertical: 10,
  },
  done_button: {
    margin: 10,
  },
});

export default Profile;
