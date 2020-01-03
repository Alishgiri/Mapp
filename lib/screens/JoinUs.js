import {
  View,
  Animated,
  Keyboard,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {debounce} from 'lodash';
import {Navigation} from 'react-native-navigation';
import ImagePicker from 'react-native-image-picker';

import Fab from '../components/Fab';
import {
  PURPLE,
  FONT_SM,
  FONT_LG,
  LIGHT_GREY,
  PURPLE_LIGHT,
  getDimentions,
  LIGHTER_PURPLE,
} from '../utilities/constants/style-constants';
import {setRootToLandingPage} from '../navigation';
import {TopImageView} from '../components/join_us';
import PageIndicator from '../components/PageIndicator';
import {Label, SafeArea, TextFieldWithButton} from '../components/ui';
import {COUNTRY_CODES_SCREEN} from '../utilities/constants/screen-constants';

const subtitles = [
  'Enter your phone number',
  'Introduce verification code',
  'Enter your name',
];
const placeholders = ['Your phone number', 'Security Code', 'Username'];

class JoinUs extends React.Component {
  state = {
    value: '',
    username: '',
    activeSlot: 1,
    focused: false,
    imageUrl: null,
    isLoading: false,
    invalidCode: false,
    countryCode: 'code',
  };

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.scaleAnimation = new Animated.Value(1);
    this.keyboardDidShow = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHide = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShow.remove();
    this.keyboardDidHide.remove();
  }

  _keyboardDidShow = () => {
    // if (this.state.activeSlot === 3) {
    Animated.timing(this.scaleAnimation, {
      toValue: 0.7,
      duration: 200,
    }).start();
    // }
  };

  _keyboardDidHide = () => {
    // if (this.state.activeSlot === 3) {
    Animated.timing(this.scaleAnimation, {
      toValue: 1,
      duration: 200,
    }).start();
    // }
  };

  nextPage = () => {
    const {activeSlot} = this.state;
    if (activeSlot < 2) {
      this.setState({activeSlot: activeSlot + 1}, () =>
        this.scroll_view.scrollToIndex({index: activeSlot, animated: true}),
      );
    } else if (activeSlot === 2) {
      this.setState({
        isLoading: true,
        invalidCode: true,
      });
      setTimeout(() => {
        this.setState(
          {
            isLoading: false,
            invalidCode: false,
            activeSlot: activeSlot + 1,
          },
          () =>
            this.scroll_view.scrollToIndex({index: activeSlot, animated: true}),
        );
      }, 1000);
    } else if (activeSlot === 3) {
      setRootToLandingPage();
    }
  };

  previousPage = () => {
    const {activeSlot} = this.state;
    this.setState(
      {value: '', activeSlot: activeSlot - 1, invalidCode: false},
      () =>
        this.scroll_view.scrollToIndex({
          index: activeSlot === 3 ? activeSlot - 1 : activeSlot,
          animated: true,
        }),
    );
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

  presentCountryCodeView = () => {
    this.modalView = 'Country code screen';
    Navigation.showModal({
      component: {
        id: this.modalView,
        name: COUNTRY_CODES_SCREEN,
        passProps: {
          onDismiss: this._dismissModal,
          onSelection: this._onCodeSelection,
        },
      },
    });
  };

  _onCodeSelection = countryCode => {
    this._dismissModal();
    this.setState({countryCode});
  };

  _handleInputPress = () => {
    this.input.current.focus();
  };

  _handleFocus = () => {
    this.setState({focused: true});
  };

  _handleBlur = () => {
    this.setState({focused: false});
  };

  _handleChange = value => {
    this.setState(state => {
      if (state.value.length >= 4) return null;
      return {
        value: (state.value + value).slice(0, 4),
      };
    });
  };

  _handleKeyPress = e => {
    if (e.nativeEvent.key === 'Backspace') {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };

  _dismissModal = () => Navigation.dismissModal(this.modalView);

  _renderItem = ({item}) => {
    const {value, activeSlot, isLoading, countryCode} = this.state;
    if (activeSlot === 2) {
      const codeLength = [0, 0, 0, 0];
      const values = value.split('');
      const selectedIndex =
        values.length < codeLength.length
          ? values.length
          : codeLength.length - 1;
      return (
        <View style={styles.field_group}>
          {codeLength.map((_, index) => {
            return (
              <View key={index} style={styles.individual_text_input}>
                <Label
                  title={values[index] ?? '0'}
                  style={{
                    fontSize: FONT_LG,
                    backgroundColor: 'transparent',
                    color: values[index] ? 'black' : LIGHT_GREY,
                  }}
                />
              </View>
            );
          })}
          <TextInput
            value=""
            ref={this.input}
            keyboardType="numeric"
            onBlur={this._handleBlur}
            onFocus={this._handleFocus}
            onKeyPress={this._handleKeyPress}
            style={{
              top: 0,
              bottom: 0,
              margin: 0,
              width: 50,
              height: 60,
              marginVertical: 4,
              fontSize: FONT_LG,
              textAlign: 'center',
              marginHorizontal: 20,
              position: 'absolute',
              left: selectedIndex * 70,
              backgroundColor: 'transparent',
            }}
            onChangeText={this._handleChange}
          />
        </View>
      );
    }
    return (
      <TextFieldWithButton
        hideButton
        style={styles.text_field}
        busyIndicator={isLoading}
        placeholder={placeholders[activeSlot - 1]}
        {...(activeSlot === 1 ? {code: countryCode} : {})}
        onSearchCountryCode={this.presentCountryCodeView}
      />
    );
  };

  render() {
    const {activeSlot, invalidCode, imageUrl, username} = this.state;
    const resizeAnimation = {transform: [{scale: this.scaleAnimation}]};
    return (
      <SafeArea style={styles.container}>
        {activeSlot === 3 && (
          <TopImageView
            username={username}
            imageUrl={imageUrl}
            style={[{flex: 1}, resizeAnimation]}
            onAddImage={this.pickProfilePicture}
          />
        )}
        <View style={styles.mid_container}>
          <View style={styles.top_view}>
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
              keyExtractor={(item, index) => `${index}`}
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
            <View style={{alignItems: 'center'}}>
              <Label title="Didn't receive a code?" color={LIGHT_GREY} />
              <Label title="Resend" color={PURPLE} />
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
        <PageIndicator
          style={styles.indicator}
          activePage={this.state.activeSlot}
        />
        {activeSlot > 1 && (
          <Fab
            title="BACK"
            style={styles.back}
            onPress={this.previousPage}
            titleStyle={styles.back_title}
          />
        )}
        <Fab title="Next" onPress={this.nextPage} />
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  mid_container: {
    flex: 2,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  top_view: {
    alignItems: 'center',
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
  indicator: {
    marginVertical: 40,
  },
  field_group: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    width: getDimentions().width - 100,
  },
  individual_text_input: {
    width: 50,
    height: 60,
    borderRadius: 25,
    marginVertical: 4,
    fontSize: FONT_LG,
    textAlign: 'center',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHTER_PURPLE,
  },
  text_field: {
    marginVertical: 4,
    marginHorizontal: 10,
    width: getDimentions().width - 100,
  },
  terms_conditions: {
    alignItems: 'center',
  },
  back: {
    left: -20,
    width: 150,
    backgroundColor: 'transparent',
  },
  back_title: {
    color: '#969292',
    fontSize: FONT_SM,
  },
});

export default JoinUs;
