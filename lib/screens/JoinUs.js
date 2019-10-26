import React from 'react';
import {debounce} from 'lodash';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {View, FlatList, Image, StyleSheet} from 'react-native';

import {
  Label,
  SafeArea,
  AppButton,
  TextFieldWithButton,
} from '../components/ui';
import {
  PURPLE,
  LIGHT_GREY,
  PURPLE_LIGHT,
  getDimentions,
  SHADOW_EFFECT,
  LIGHTER_PURPLE,
} from '../utilities/constants/style-constants';
import {setRootToLandingPage} from '../navigation';
import PageIndicator from '../components/PageIndicator';
import {generateEntypoIcon} from '../utilities/icon-generator';

const subtitles = [
  'Enter your phone number',
  'Enter the security code received via SMS',
  'Enter username and add a profile picture',
];
const placeholders = ['Your phone number', 'Security Code', 'Username'];

class JoinUs extends React.Component {
  state = {
    username: '',
    activeSlot: 1,
    imageUrl: null,
    isLoading: false,
    invalidCode: false,
  };

  nextPage = () => {
    const {activeSlot} = this.state;
    if (activeSlot === 2) {
      this.setState({
        isLoading: true,
        invalidCode: true,
      });
      setTimeout(() => {
        this.setState({invalidCode: false, isLoading: false});
        this.setState({activeSlot: activeSlot + 1});
      }, 1000);
    } else if (activeSlot === 3) {
      setRootToLandingPage();
    } else if (activeSlot < 2) {
      this.setState({activeSlot: activeSlot + 1}, () =>
        this.scroll_view.scrollToIndex({index: activeSlot, animated: true}),
      );
    }
  };

  picProfilePicture = debounce(
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

  _renderItem = item => {
    const {activeSlot, isLoading} = this.state;
    return (
      <TextFieldWithButton
        onPress={this.nextPage}
        style={styles.text_field}
        busyIndicator={isLoading}
        placeholder={placeholders[activeSlot - 1]}
      />
    );
  };

  render() {
    const {activeSlot, invalidCode, imageUrl, username} = this.state;
    return (
      <SafeArea style={styles.container}>
        {activeSlot === 3 && (
          <View style={styles.top_container}>
            <LinearGradient
              style={styles.picture_container}
              colors={[LIGHTER_PURPLE, '#F2F2F2']}>
              {imageUrl ? (
                <Image
                  resizeMode="cover"
                  source={{uri: imageUrl}}
                  style={styles.image_background}
                />
              ) : (
                <AppButton
                  style={styles.add_button}
                  onPress={this.picProfilePicture}
                  title={generateEntypoIcon('plus', 20, PURPLE)}
                />
              )}
            </LinearGradient>
            <Label
              align="center"
              style={styles.add_photo}
              title={imageUrl ? username : 'Add Photo'}
            />
          </View>
        )}
        <View style={styles.mid_container(activeSlot === 3)}>
          <View>
            <Label title="Join Us" size={30} fontWeight="bold" />
            <Label
              style={styles.subtitle_label(invalidCode)}
              title={
                invalidCode
                  ? 'This security code is invalid'
                  : subtitles[activeSlot - 1]
              }
            />
            <FlatList
              horizontal
              bounces={false}
              data={[0, 1, 2]}
              scrollEnabled={false}
              renderItem={this._renderItem}
              ref={ref => (this.scroll_view = ref)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scroll_view}
              keyExtractor={(item, index) => `${index}`}
            />
            <PageIndicator
              style={styles.indicator}
              activePage={this.state.activeSlot}
            />
          </View>
        </View>
        <View style={styles.terms_conditions}>
          {activeSlot === 1 && (
            <>
              <Label title="By continuing I accept the" color={LIGHT_GREY} />
              <Label title="Terms & Conditions" color={PURPLE} />
            </>
          )}
          {activeSlot === 2 && !invalidCode && (
            <View style={{flexDirection: 'row'}}>
              <Label title="Resend" color={PURPLE} />
              <Label title=" security code" color={LIGHT_GREY} />
            </View>
          )}
          {invalidCode && (
            <>
              <Label title="59 sec" color={PURPLE} />
              <Label
                color={LIGHT_GREY}
                title="until you can resend security code"
              />
            </>
          )}
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
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
  picture_container: {
    width: 120,
    height: 120,
    marginBottom: 5,
    borderRadius: 60,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_background: {
    width: 120,
    height: 120,
  },
  mid_container: function(activeSlot) {
    return {
      flex: 2,
      paddingHorizontal: 40,
      justifyContent: activeSlot ? 'flex-start' : 'center',
    };
  },
  label_group: {
    marginLeft: 10,
    marginBottom: 30,
  },
  subtitle_label: function(invalid) {
    return {
      marginTop: 5,
      marginBottom: 20,
      color: invalid ? 'red' : PURPLE_LIGHT,
    };
  },
  scroll_view: {},
  indicator: {
    marginVertical: 40,
  },
  text_field: {
    marginHorizontal: 10,
    width: getDimentions().width - 100,
  },
  terms_conditions: {
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default JoinUs;
