import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

import {RoundedTextField, Label} from '../ui';
import {
  PURPLE,
  LIGHT_GREY,
  PURPLE_LIGHT,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {generateEvilIcon} from '../../utilities/icon-generator';

class RelevantEvents extends React.Component {
  state = {
    relevantPlaces: [
      {
        id: '0',
        name: 'Aguaport',
        location: 'Sociteni',
        image:
          'https://media.gettyimages.com/photos/big-ben-london-picture-id560641539?s=612x612',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: '1',
        name: 'Broascs party',
        location: 'Padsobka, Posta veche',
        image:
          'https://media.gettyimages.com/photos/golden-gate-bridge-san-francisco-picture-id514642440?s=612x612',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: '2',
        name: 'Bultuaca fest',
        location: 'Balti',
        image:
          'http://www.flochamber.com/wp-content/uploads/2017/08/foreverhomes.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: '3',
        name: 'Broascs party',
        location: 'Padsobka, Posta veche',
        image:
          'https://media.gettyimages.com/photos/golden-gate-bridge-san-francisco-picture-id514642440?s=612x612',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: '4',
        name: 'Bultuaca fest',
        location: 'Balti',
        image:
          'http://www.flochamber.com/wp-content/uploads/2017/08/foreverhomes.jpg',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  };

  _renderItem = ({item}) => (
    <View
      style={{
        height: 100,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        source={{uri: item.image}}
        style={{width: 100, height: 80, marginRight: 10, borderRadius: 20}}
      />
      <View>
        <Label title={item.name} fontWeight="bold" size={20} />
        <Label
          size={12}
          color={PURPLE}
          title={item.location}
          style={{marginVertical: 4}}
        />
        <Text>
          <Text style={{color: LIGHT_GREY, fontSize: 12}}>
            {item.description.substr(0, 100)}
          </Text>
          <Text style={{color: PURPLE, fontSize: 12}}>Read more.</Text>
        </Text>
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <RoundedTextField
          placeholder="Search..."
          style={styles.text_field}
          leftIcon={generateEvilIcon('search', 20, PURPLE)}
        />
        <View style={styles.header}>
          <Label title="Relevant Events" style={styles.header_title} />
          <Label title="16" style={styles.header_title} color={PURPLE} />
        </View>
        <FlatList
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          data={this.state.relevantPlaces}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
  },
  text_field: {
    height: 40,
    backgroundColor: LIGHTER_PURPLE,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  header_title: {
    fontSize: 24,
    marginRight: 10,
    fontWeight: 'bold',
  },
});

export default RelevantEvents;
