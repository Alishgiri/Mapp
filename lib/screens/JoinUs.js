import React from 'react';
import {Navigation} from 'react-native-navigation';
import {View, Platform, FlatList, StyleSheet} from 'react-native';

import {Label, SafeArea, TextField} from '../components/ui';
import {
  PURPLE_LIGHT,
  LIGHT_GREY,
  PURPLE,
  getDimentions,
} from '../utilities/constants/style-constants';
import PageIndicator from '../components/PageIndicator';

class JoinUs extends React.Component {
  state = {currentIndex: 1};

  presentMessenger = () => {
    Navigation.push(this.props.componentId, {
      component: {
        // name: ,
      },
    });
  };

  nextPage = () => {
    const {currentIndex} = this.state;
    if (currentIndex < 3) {
      this.setState({currentIndex: currentIndex + 1}, () =>
        this.scroll_view.scrollToIndex({index: currentIndex, animated: true}),
      );
    }
  };

  _renderItem = item => (
    <TextField style={styles.text_field} onPress={this.nextPage} />
  );

  render() {
    return (
      <SafeArea style={styles.container}>
        <View style={styles.inner_container}>
          <Label title="Join Us" size={30} fontWeight="bold" />
          <Label
            style={styles.subtitle_label}
            title="Enter your phone number"
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
            activePage={this.state.currentIndex}
          />
        </View>
        <View style={styles.terms_conditions}>
          <Label title="By continuing I accept the" color={LIGHT_GREY} />
          <Label title="Terms & Conditions" color={PURPLE} />
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
  subtitle_label: {
    marginTop: 10,
    marginBottom: 30,
    color: PURPLE_LIGHT,
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
    bottom: 30,
    alignItems: 'center',
    position: 'absolute',
  },
});

export default JoinUs;
