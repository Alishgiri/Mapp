import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

import {
  PURPLE,
  FONT_XXS,
  LIGHT_GREY,
  SHADOW_EFFECT,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';
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
    <View style={styles.block}>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        style={styles.image}
        source={{uri: item.image}}
      />
      <View style={styles.block_container}>
        <Label title={item.name} fontWeight="bold" size={20} />
        <Label
          size={12}
          color={PURPLE}
          title={item.location}
          style={{marginVertical: 4}}
        />
        <Text style={styles.label}>
          <Text style={{color: LIGHT_GREY, fontSize: FONT_XXS}}>
            {item.description.substr(0, 100)}
          </Text>
          <Text style={{color: PURPLE, fontSize: FONT_XXS}}>Read more.</Text>
        </Text>
      </View>
    </View>
  );

  render() {
    const {onCreateEvent} = this.props;
    return (
      <View>
        <View style={styles.top_container}>
          <RoundedTextField
            placeholder="Search..."
            style={styles.text_field}
            leftIcon={generateEvilIcon('search', 20, PURPLE)}
          />
          <View style={styles.header}>
            <Label title="Relevant Events" style={styles.header_title} />
            <Label title="16" style={styles.header_title} color={PURPLE} />
          </View>
        </View>
        <FlatList
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
          data={this.state.relevantPlaces}
        />
        <AppButton
          title="CREATE +"
          onPress={onCreateEvent}
          style={styles.create_event_button_background}
          titleStyle={styles.create_event_button_title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text_field: {
    height: 40,
    width: '40%',
    marginTop: 20,
    backgroundColor: LIGHTER_PURPLE,
  },
  top_container: {
    marginBottom: 10,
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
  },
  block_container: {
    width: '60%',
    paddingVertical: 10,
  },
  block: {
    minHeight: 100,
    borderRadius: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 110,
    height: '100%',
    marginRight: 10,
    borderRadius: 30,
  },
  label: {
    flexDirection: 'row',
  },
  header_title: {
    fontSize: 24,
    marginRight: 10,
    fontWeight: 'bold',
  },
  create_event_button_background: {
    height: 60,
    ...SHADOW_EFFECT,
    borderWidth: 0.4,
    borderColor: '#eee',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  create_event_button_title: {
    fontSize: FONT_XXS,
  },
});

export {RelevantEvents};
