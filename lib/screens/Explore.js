import {
  View,
  Easing,
  Keyboard,
  Animated,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Navigation} from 'react-native-navigation';

import MapViewer from '../components/MapViewer';
import {
  MESSENGER_SCREEN,
  EVENT_DETAILS_SCREEN,
} from '../utilities/constants/screen-constants';
import {
  ORANGE,
  PURPLE,
  OFFWHITE,
  getDimentions,
} from '../utilities/constants/style-constants';
import MenuButton from '../components/MenuButton';
import {AppButton, Label} from '../components/ui';
import * as _ from '../components/slideup_screen';
import {generateAntDesignIcon} from '../utilities/icon-generator';

const {height} = getDimentions();

const half_screen = height / 2;

class Explore extends React.Component {
  state = {
    showExplore: true,
    bubbleColor: PURPLE,
    createEventMode: false,
    shrinkSlideUpView: false,
    displayNumberOfPeople: null,
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

  constructor(props) {
    super(props);
    this.alternateColor = false;
    this.exploreFadeAnimation = new Animated.Value(1);
    this.eventsFadeAnimation = new Animated.Value(0);
    this.fadeAnimation = new Animated.Value(1);
    this.scaleAnimation = new Animated.Value(1);
    this.bubbleAnimation = new Animated.Value(0);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboarDidHide,
    );
  }

  componentDidMount() {
    this.listener = this.state.animatedValue.addListener(
      this.onAnimatedValueChange,
    );
    this.slideUpAndFadeOut();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.state.animatedValue.removeListener(this.listener);
  }

  _keyboarDidHide = () => this.setState({shrinkSlideUpView: false});
  _keyboardDidShow = () => this.setState({shrinkSlideUpView: true});

  onAnimatedValueChange = ({value}) => {
    if (value >= half_screen) {
      this.animateEvents();
    } else {
      this.animateExpore();
    }
  };

  animateExpore = () => {
    Animated.sequence([
      Animated.timing(this.eventsFadeAnimation, {
        toValue: 0,
        duration: 350,
      }).start(() => {
        this.setState({showExplore: true});
      }),
      Animated.delay(100),
      Animated.timing(this.exploreFadeAnimation, {
        toValue: 1,
        duration: 350,
      }).start(),
    ]);
  };

  animateEvents = () => {
    Animated.sequence([
      Animated.timing(this.exploreFadeAnimation, {
        toValue: 0,
        duration: 350,
      }).start(() => {
        this.setState({showExplore: false});
      }),
      Animated.delay(100),
      Animated.timing(this.eventsFadeAnimation, {
        toValue: 1,
        duration: 350,
      }).start(),
    ]);
  };

  presentMessenger = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MESSENGER_SCREEN,
      },
    });
  };

  slideUpAndFadeOut = () => {
    Animated.parallel([
      Animated.timing(this.bubbleAnimation, {
        toValue: -120,
        duration: 3000,
        easing: Easing.ease,
      }),
      Animated.timing(this.fadeAnimation, {
        toValue: 0,
        duration: 4000,
      }),
      Animated.timing(this.scaleAnimation, {
        toValue: 0,
        duration: 4000,
        easing: Easing.ease,
      }),
    ]).start(() => {
      this.alternateColor = !this.alternateColor;
      this.setState({bubbleColor: this.alternateColor ? ORANGE : PURPLE});

      if (this.alternateColor) {
        setTimeout(() => {
          this.reanimate();
        }, 1000);
      } else {
        this.reanimate();
      }
    });
  };

  reanimate = () => {
    this.fadeAnimation.setValue(1);
    this.scaleAnimation.setValue(1);
    this.bubbleAnimation.setValue(0);
    this.slideUpAndFadeOut();
  };

  displayContent = () => {
    const {createEventMode, showExplore, events} = this.state;
    if (createEventMode) {
      return (
        <_.CreateEvent
          saveEvent={this.saveEvent}
          eventsCount={events.length}
          onClose={this.toggleCreateEventMode}
        />
      );
    } else {
      if (showExplore) {
        const animation = {opacity: this.exploreFadeAnimation};
        return (
          <Animated.View style={animation}>
            <Label title="EXPLORE" style={styles.explore_style} />
          </Animated.View>
        );
      } else {
        const animation = {opacity: this.eventsFadeAnimation};
        return (
          <Animated.View style={[{width: '100%', height: '100%'}, animation]}>
            <_.RelevantEvents
              events={events}
              onItemExpanded={this._onItemExpanded}
              onCreateEvent={this.toggleCreateEventMode}
              displayEventDetails={this.presentEventDetailsScren}
            />
          </Animated.View>
        );
      }
    }
  };

  _onItemExpanded = count => {
    this.setState({displayNumberOfPeople: count});
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
    const {
      bubbleColor,
      animatedValue,
      createEventMode,
      shrinkSlideUpView,
      displayNumberOfPeople,
    } = this.state;
    let addBottomOffset;
    let draggableRange = false;
    if (shrinkSlideUpView && !createEventMode) {
      draggableRange = height / 1.7;
      addBottomOffset = true;
    } else {
      draggableRange = createEventMode ? height / 1.7 : height / 1.5;
    }
    const animation = {
      opacity: this.fadeAnimation,
      transform: [
        {scale: this.scaleAnimation},
        {translateY: this.bubbleAnimation},
      ],
    };
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="height">
        <MapViewer
          eventMode={createEventMode}
          onPressSociteni={() => {}}
          displayPeople={displayNumberOfPeople}
        />
        <MenuButton onPress={() => {}} style={{paddingTop: 10}} />
        <SlidingUpPanel
          showBackdrop={false}
          ref={c => (this._panel = c)}
          minimumDistanceThreshold={5}
          animatedValue={animatedValue}
          containerStyle={{elevation: 5, paddingTop: 30}}
          draggableRange={{top: draggableRange, bottom: 90}}>
          <>
            <View
              style={styles.slideup_container(draggableRange, addBottomOffset)}>
              {this.displayContent()}
            </View>
            <View style={styles.button_view}>
              <AppButton
                onPress={this.presentMessenger}
                style={styles.messenger_button}
                titleStyle={styles.messenger_button_text}
                title={generateAntDesignIcon('message1', 20, 'white')}
              />
              <Animated.View
                style={[
                  styles.bubble_view(bubbleColor, this.alternateColor),
                  animation,
                ]}
              />
            </View>
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
  button_text: {
    fontSize: 16,
    color: 'grey',
  },
  explore_style: {
    margin: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  slideup_container: function(h, addBottomOffset) {
    return {
      width: '100%',
      elevation: 10,
      height: h - 30,
      alignItems: 'center',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: OFFWHITE,
      ...(addBottomOffset ? {paddingBottom: 20} : {}),
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
  button_view: {
    top: 0,
    right: 30,
    elevation: 11,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  messenger_button: {
    width: 60,
    height: 60,
    shadowRadius: 8,
    borderRadius: 30,
    shadowOpacity: 0.6,
    shadowColor: ORANGE,
    alignItems: 'center',
    backgroundColor: ORANGE,
    justifyContent: 'center',
    borderBottomRightRadius: 0,
    shadowOffset: {width: 0, height: 4},
  },
  messenger_button_text: {
    transform: [{scaleX: -1}, {rotate: '0deg'}],
  },
  bubble_view: function(backgroundColor, alternate) {
    return {
      top: 4,
      width: 8,
      height: 8,
      backgroundColor,
      borderRadius: 4,
      position: 'absolute',
      ...(alternate ? {left: 14} : {right: 14}),
    };
  },
});

export default Explore;
