import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {Label, SafeArea, TextField} from '../components/ui';
import {
  PURPLE_LIGHT,
  LIGHT_GREY,
  PURPLE,
} from '../utilities/constants/style-constants';
import PageIndicator from '../components/PageIndicator';

class JoinUs extends React.Component {
  presentMessenger = () => {
    Navigation.push(this.props.componentId, {
      component: {
        // name: ,
      },
    });
  };

  render() {
    return (
      <SafeArea style={styles.container}>
        <View style={styles.inner_container}>
          <Label title="Join Us" size={30} fontWeight="bold" />
          <Label
            style={styles.subtitle_label}
            title="Enter your phone number"
          />
          <TextField />
          <PageIndicator activePage={0} />
          <View style={styles.terms_conditions}>
            <Label title="By continuing I accept the" color={LIGHT_GREY} />
            <Label title="Terms & Conditions" color={PURPLE} />
          </View>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  inner_container: {
    height: '60%',
    paddingHorizontal: 40,
  },
  subtitle_label: {
    marginTop: 10,
    marginBottom: 30,
    color: PURPLE_LIGHT,
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
