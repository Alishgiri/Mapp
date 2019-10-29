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
    const {onCreateEvent, events} = this.props;
    return (
      <View style={{width: '100%', height: '100%'}}>
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
          data={events}
          style={styles.flat_list}
          renderItem={this._renderItem}
          keyExtractor={item => item.id}
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
    marginHorizontal: 20,
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
  flat_list: {
    marginHorizontal: 20,
  },
  create_event_button_background: {
    height: 46,
    elevation: 20,
    marginTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  create_event_button_title: {
    fontWeight: 'bold',
    fontSize: FONT_XXS,
  },
});

export {RelevantEvents};
