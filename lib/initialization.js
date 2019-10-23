import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {setRootToJoinUs, setRootToLandingPage} from './navigation';
import {TEXT_COLOR, PURPLE} from './utilities/constants/style-constants';

export default class Initialization extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      setRootToJoinUs();
      // setRootToLandingPage();
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.mapp}>Mapp</Text>
          <Text style={styles.beta}>beta</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapp: {
    fontSize: 50,
    color: TEXT_COLOR,
    fontWeight: 'bold',
  },
  beta: {
    top: -5,
    right: 5,
    fontSize: 16,
    color: PURPLE,
    fontWeight: 'bold',
    position: 'absolute',
  },
});
