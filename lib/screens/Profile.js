import React from 'react';
import {debounce} from 'lodash';
import {View, StyleSheet} from 'react-native';
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
      {name: 'Country1'},
      {name: 'Country2'},
      {name: 'Country3'},
      {name: 'Country4'},
      {name: 'Country5'},
      {name: 'Country6'},
      {name: 'Country7'},
      {name: 'Country8'},
      {name: 'Country9'},
      {name: 'Country10'},
      {name: 'Country11'},
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
    const {imageUrl, countries} = this.state;
    return (
      <SafeArea style={styles.container}>
        <BackButton componentId={this.props.componentId} />
        <TopImageView
          imageUrl={imageUrl}
          style={styles.top_image}
          onAddImage={this.pickProfilePicture}
        />
        <View style={styles.mid_view}>
          <RoundedTextField style={styles.text_field} placeholder="Username" />
          <AutoCompleteTextField
            data={countries}
            // align={}
            // invalid={}
            compareKey="name"
            style={styles.text_field}
            placeholder="Select location"
            selected={selectedCountry => this.setState({selectedCountry})}
          />
        </View>
        <DoneButton />
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  top_image: {
    flex: 1,
    marginBottom: 40,
  },
  mid_view: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  text_field: {
    width: '80%',
    marginVertical: 10,
  },
});

export default Profile;
