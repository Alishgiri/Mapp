import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Navigation} from 'react-native-navigation';

import {
  generateOcticon,
  generateFontistoIcon,
} from '../utilities/icon-generator';
import MapViewer from '../components/MapViewer';
import {
  MESSENGER_SCREEN,
  EVENT_DETAILS_SCREEN,
} from '../utilities/constants/screen-constants';
import MenuButton from '../components/MenuButton';
import {AppButton, Label} from '../components/ui';
import * as _ from '../components/slideup_screen';
import {ORANGE, OFFWHITE} from '../utilities/constants/style-constants';

const {height} = Dimensions.get('window');

class Explore extends React.Component {
  state = {
    showExplore: true,
    createEventMode: false,
    animatedValue: new Animated.Value(90),
    events: [
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

  componentDidMount() {
    this.listener = this.state.animatedValue.addListener(
      this.onAnimatedValueChange,
    );
  }

  componentWillUnmount() {
    this.state.animatedValue.removeListener(this.listener);
  }

  onAnimatedValueChange = ({value}) => {
    if (value < height - value) this.setState({showExplore: true});
    else this.setState({showExplore: false});
  };

  presentMessenger = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MESSENGER_SCREEN,
      },
    });
  };

  displayContent = () => {
    const {createEventMode, showExplore, events} = this.state;
    if (!createEventMode && showExplore) {
      return <Label title="EXPLORE" style={styles.explore_style} />;
    }
    if (createEventMode) {
      return (
        <_.CreateEvent
          saveEvent={this.saveEvent}
          eventsCount={events.length}
          onClose={this.toggleCreateEventMode}
        />
      );
    } else {
      return (
        <_.RelevantEvents
          events={events}
          onCreateEvent={this.toggleCreateEventMode}
          displayEventDetails={this.presentEventDetailsScren}
        />
      );
    }
  };

  presentEventDetailsScren = event => {
    Navigation.showModal({
      component: {
        name: EVENT_DETAILS_SCREEN,
        passProps: {event},
      },
    });
  };

  toggleCreateEventMode = () =>
    this.setState({createEventMode: !this.state.createEventMode});

  saveEvent = event =>
    this.setState({events: this.state.events.concat([event])});

  render() {
    const {animatedValue, createEventMode} = this.state;
    const draggableRange = createEventMode ? height / 1.7 : height / 1.5;
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <MapViewer eventMode={createEventMode} />
        <AppButton
          title="Sociteni"
          onPress={() => {}}
          titleStyle={styles.button_text}
          icon={generateOcticon('location', 15)}
          style={styles.sociteni_button_background}
        />
        <MenuButton onPress={() => {}} style={{paddingTop: 10}} />
        <SlidingUpPanel
          showBackdrop={false}
          ref={c => (this._panel = c)}
          minimumDistanceThreshold={5}
          animatedValue={animatedValue}
          containerStyle={{paddingTop: 30}}
          draggableRange={{top: draggableRange, bottom: 90}}>
          <>
            <View style={styles.slideup_container(draggableRange)}>
              {this.displayContent()}
            </View>
            <AppButton
              onPress={this.presentMessenger}
              style={styles.messenger_button}
              titleStyle={styles.messenger_button_text}
              title={generateFontistoIcon('commenting', 20, 'white')}
            />
          </>
        </SlidingUpPanel>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebedeb',
  },
  mapp_image: {
    width: '100%',
    height: '100%',
  },
  sociteni_button_background: {
    top: 20,
    left: 20,
    elevation: 2,
    borderRadius: 20,
    paddingVertical: 8,
    position: 'absolute',
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  button_text: {
    fontSize: 16,
    color: 'grey',
  },
  explore_style: {
    margin: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  slideup_container: function(h) {
    return {
      width: '100%',
      elevation: 10,
      height: h - 30,
      alignItems: 'center',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: OFFWHITE,
    };
  },
  text: {
    fontSize: 15,
    marginVertical: 20,
    fontWeight: 'bold',
  },
  fab_top_left: {
    top: 20,
    left: 20,
    position: 'absolute',
  },
  messenger_button: {
    top: 0,
    right: 30,
    width: 60,
    height: 60,
    elevation: 11,
    shadowRadius: 8,
    borderRadius: 30,
    shadowOpacity: 0.6,
    shadowColor: ORANGE,
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: ORANGE,
    justifyContent: 'center',
    borderBottomRightRadius: 0,
    shadowOffset: {width: 0, height: 4},
  },
  messenger_button_text: {
    transform: [{scaleX: -1}, {rotate: '0deg'}],
  },
});

export default Explore;
