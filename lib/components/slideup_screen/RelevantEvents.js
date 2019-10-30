import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  PURPLE,
  FONT_XXS,
  LIGHT_GREY,
  LIGHTER_PURPLE,
  OFFWHITE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';
import {generateEvilIcon} from '../../utilities/icon-generator';

class RelevantEvents extends React.Component {
  state = {expandedIndex: null};

  expandBlock = index => {
    const {expandedIndex} = this.state;
    if (expandedIndex === index) {
      this.setState({expandedIndex: null});
    } else this.setState({expandedIndex: index});
  };

  expandDetails = index => {};

  _renderItem = ({item, index}) => {
    const {expandedIndex} = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => this.expandBlock(index)}>
        <View style={styles.block}>
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            style={styles.image}
            source={{uri: item.image}}
          />
          <View style={styles.block_inner_container}>
            <Label title={item.name} fontWeight="bold" size={20} />
            <Label
              size={12}
              color={PURPLE}
              title={item.location}
              style={{marginVertical: 4}}
            />
            {/* {expandedIndex === index && ( */}
            <Text style={styles.label}>
              <Text style={{color: LIGHT_GREY, fontSize: FONT_XXS}}>
                {item.description.substr(0, 50)}…
              </Text>
            </Text>
            <Text
              style={{color: PURPLE, fontSize: FONT_XXS}}
              onPress={() => this.props.displayEventDetails(item)}>
              Read more
            </Text>
            {/* )} */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
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
          horizontal
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
  block_inner_container: {
    width: 180,
    padding: 5,
    marginHorizontal: 10,
  },
  block: {
    borderRadius: 30,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 30,
    marginHorizontal: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    marginHorizontal: 10,
    backgroundColor: OFFWHITE,
  },
  create_event_button_background: {
    height: 60,
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
