import {
  View,
  Text,
  Image,
  Keyboard,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import {
  PURPLE,
  FONT_XXS,
  OFFWHITE,
  LIGHT_GREY,
  getDimentions,
  LIGHTER_PURPLE,
} from '../../utilities/constants/style-constants';
import {RoundedTextField, Label, AppButton} from '../ui';
import {generateEvilIcon} from '../../utilities/icon-generator';

class RelevantEvents extends React.Component {
  state = {expandedIndex: null, readMoreIndex: null, flatListHeight: null};

  expandBlock = index => {
    const {expandedIndex} = this.state;
    if (expandedIndex === index) {
      this.setState({expandedIndex: null}, this.props.onItemExpanded(null));
    } else {
      this.setState({expandedIndex: index}, this.props.onItemExpanded(index));
    }
  };

  expandDetails = index => {
    const {readMoreIndex} = this.state;
    if (readMoreIndex === index) {
      this.setState({readMoreIndex: null});
    } else this.setState({readMoreIndex: index});
  };

  _renderItem = ({item, index}) => {
    const {expandedIndex, readMoreIndex, flatListHeight} = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => this.expandBlock(index)}>
        <View style={styles.block(flatListHeight)}>
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
            {expandedIndex === index && (
              <Text style={styles.label}>
                <Text style={{color: LIGHT_GREY, fontSize: FONT_XXS}}>
                  {readMoreIndex === index
                    ? item.description
                    : item.description.substr(0, 100)}
                </Text>
                <Text
                  onPress={() => this.expandDetails(index)}
                  style={{color: PURPLE, fontSize: FONT_XXS}}>
                  {readMoreIndex === index
                    ? ' Show less'
                    : item.description.length >= 100 && ' Read more.'}
                </Text>
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {onCreateEvent, events, draggableRange} = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{width: '100%', height: '100%'}}>
          <View style={styles.top_container}>
            <RoundedTextField
              placeholder="Search..."
              style={styles.text_field}
              leftIcon={generateEvilIcon('search', 24, PURPLE)}
            />
            <View style={styles.header}>
              <Label title="Relevant Events" style={styles.header_title} />
              <Label title="16" style={styles.header_title} color={PURPLE} />
            </View>
          </View>
          <View
            onLayout={({
              nativeEvent: {
                layout: {height},
              },
            }) => this.setState({flatListHeight: height})}
            style={styles.bottom_view}>
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const equalizer = () => {
  const height = getDimentions().height;
  console.warn(height);
  if (height <= 720) {
    return {divider: 2, overhead: 45};
  } else if (height <= 830) {
    return {divider: 3, overhead: 34};
  } else {
    return {divider: 4, overhead: 28};
  }
};

const styles = StyleSheet.create({
  text_field: {
    height: 40,
    marginTop: 20,
    maxWidth: '40%',
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
  block: function(flatListHeight) {
    const evaluate = equalizer();
    return {
      borderRadius: 20,
      marginVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      minHeight: flatListHeight / evaluate.divider - evaluate.overhead,
    };
  },
  image: {
    width: 100,
    height: '100%',
    maxHeight: 120,
    marginRight: 10,
    borderRadius: 20,
  },
  label: {
    flexDirection: 'row',
  },
  header_title: {
    fontSize: 24,
    marginRight: 10,
    fontWeight: 'bold',
  },
  bottom_view: {
    top: 110,
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 30,
    position: 'absolute',
  },
  flat_list: {
    marginHorizontal: 20,
    backgroundColor: OFFWHITE,
  },
  create_event_button_background: {
    height: 60,
    // elevation: 10,
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
