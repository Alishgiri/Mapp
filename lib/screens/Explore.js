import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Navigation} from 'react-native-navigation';

import {
  generateOcticon,
  generateFontistoIcon,
} from '../utilities/icon-generator';
import MenuButton from '../components/MenuButton';
import {AppButton, SafeArea} from '../components/ui';
import {ORANGE} from '../utilities/constants/style-constants';
import {MESSENGER_SCREEN} from '../utilities/constants/screen-constants';
import RelevantEvents from '../components/slideup_screen/RelevantEvents';

const {height} = Dimensions.get('window');

class Explore extends React.Component {
  presentMessenger = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: MESSENGER_SCREEN,
      },
    });
  };

  render() {
    return (
      <SafeArea style={styles.container}>
        <View style={{flex: 1}}>
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            style={styles.mapp_image}
            source={require('../assets/img/mapp.png')}
          />
          <AppButton
            title="Sociteni"
            onPress={() => {}}
            titleStyle={styles.button_text}
            style={styles.sociteni_button_background}
            icon={generateOcticon('location')}
          />
          <MenuButton onPress={() => {}} style={{paddingTop: 10}} />
        </View>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          animatedValue={new Animated.Value(90)}
          draggableRange={{top: height / 1.5, bottom: 50}}>
          <View style={styles.slideup_container}>
            <RelevantEvents />

            <AppButton
              onPress={this.presentMessenger}
              titleStyle={styles.commenting_button_text}
              style={styles.commenting_button_background}
              title={generateFontistoIcon('commenting', 20, 'white')}
            />
          </View>
        </SlidingUpPanel>
      </SafeArea>
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
    borderRadius: 20,
    shadowRadius: 10,
    shadowOpacity: 0.6,
    paddingVertical: 10,
    position: 'absolute',
    paddingHorizontal: 15,
    shadowColor: '#bbbfbb',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
  },
  button_text: {
    fontSize: 16,
    color: 'grey',
  },

  slideup_container: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
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
  commenting_button_background: {
    top: -20,
    right: 30,
    width: 60,
    height: 60,
    shadowRadius: 8,
    borderRadius: 30,
    shadowOpacity: 0.6,
    alignItems: 'center',
    position: 'absolute',
    shadowColor: ORANGE,
    backgroundColor: ORANGE,
    justifyContent: 'center',
    borderBottomRightRadius: 0,
    shadowOffset: {width: 0, height: 4},
  },
  commenting_button_text: {
    transform: [{scaleX: -1}, {rotate: '0deg'}],
  },
});

export default Explore;
