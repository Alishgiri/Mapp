import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {
  PURPLE,
  LIGHT_GREY,
  PURPLE_LIGHT,
  getDimentions,
} from '../utilities/constants/style-constants';
import {setRootToLandingPage} from '../navigation';
import PageIndicator from '../components/PageIndicator';
import {Label, SafeArea, TextField} from '../components/ui';

const subtitles = [
  'Enter your phoe number',
  'Enter the security code received via SMS',
];
const placeholders = ['Your phone number', 'Security Code', 'Security Code'];

class JoinUs extends React.Component {
  state = {currentIndex: 1, invalidCode: false, isLoading: false};

  nextPage = () => {
    const {currentIndex} = this.state;
    if (currentIndex === 2) {
      this.setState({
        isLoading: true,
        invalidCode: true,
        currentIndex: currentIndex + 1,
      });
      setTimeout(() => {
        this.setState({invalidCode: false, isLoading: false});
        setRootToLandingPage();
      }, 3000);
    } else if (currentIndex < 2) {
      this.setState({currentIndex: currentIndex + 1}, () =>
        this.scroll_view.scrollToIndex({index: currentIndex, animated: true}),
      );
    }
  };

  _renderItem = item => {
    const {currentIndex, isLoading} = this.state;
    return (
      <TextField
        onPress={this.nextPage}
        style={styles.text_field}
        busyIndicator={isLoading}
        placeholder={placeholders[currentIndex - 1]}
      />
    );
  };

  render() {
    const {currentIndex, invalidCode} = this.state;
    return (
      <SafeArea style={styles.container}>
        <View style={styles.inner_container}>
          <View style={styles.label_group}>
            <Label title="Join Us" size={30} fontWeight="bold" />
            <Label
              style={styles.subtitle_label(invalidCode)}
              title={
                invalidCode
                  ? 'This security code is invalid'
                  : subtitles[currentIndex - 1]
              }
            />
          </View>
          <FlatList
            horizontal
            data={[0, 1]}
            bounces={false}
            scrollEnabled={false}
            renderItem={this._renderItem}
            ref={ref => (this.scroll_view = ref)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scroll_view}
            keyExtractor={(item, index) => `${index}`}
          />
          <PageIndicator
            style={styles.indicator}
            activePage={this.state.currentIndex}
          />
        </View>
        <View style={styles.terms_conditions}>
          {currentIndex === 1 && (
            <>
              <Label title="By continuing I accept the" color={LIGHT_GREY} />
              <Label title="Terms & Conditions" color={PURPLE} />
            </>
          )}
          {currentIndex === 2 && (
            <View style={{flexDirection: 'row'}}>
              <Label title="Resend" color={PURPLE} />
              <Label title=" security code" color={LIGHT_GREY} />
            </View>
          )}
          {currentIndex === 3 && (
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
  inner_container: {
    padding: 40,
  },
  label_group: {
    marginLeft: 10,
    marginBottom: 30,
  },
  subtitle_label: function(invalid) {
    return {
      marginTop: 5,
      color: invalid ? 'red' : PURPLE_LIGHT,
    };
  },
  scroll_view: {
    paddingVertical: 20,
  },
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
