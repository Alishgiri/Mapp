import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import {
  SHADOW_EFFECT,
  LIGHTER_PURPLE,
} from '../utilities/constants/style-constants';
import {SafeArea, Label} from '../components/ui';
import {Navigation} from 'react-native-navigation';
import {JOIN_US_SCREEN} from '../utilities/constants/screen-constants';

class CountryCodes extends React.Component {
  presentJoinUsScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {name: JOIN_US_SCREEN},
    });
  };

  _renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={this.presentJoinUsScreen}>
      <View style={styles.inner_container}>
        <View style={styles.country_code}>
          <Label title="+333" />
        </View>
        <Label title="Country" style={styles.country_name} />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <SafeArea style={styles.container}>
        <FlatList
          style={styles.flat_list}
          data={[...Array(20).keys()]}
          renderItem={this._renderItem}
          contentContainerStyle={styles.content_style}
          keyExtractor={({item, index}) => `${item}`}
        />
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flat_list: {
    width: '100%',
  },
  content_style: {
    alignItems: 'center',
  },
  inner_container: {
    height: 60,
    margin: 20,
    padding: 20,
    width: 250,
    ...SHADOW_EFFECT,
    elevation: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  country_code: {
    marginLeft: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: LIGHTER_PURPLE,
  },
  country_name: {
    marginLeft: 10,
  },
});

export default CountryCodes;
