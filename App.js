import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import SlidingUpPanel from 'rn-sliding-up-panel';

import {
  generateOcticon,
  generateFontistoIcon,
  generateAntDesignIcon,
} from './lib/utilities/icon-generator';
import {AppButton} from './lib/components/ui';

const {height} = Dimensions.get('window');

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            style={styles.mapp_image}
            source={require('./lib/assets/img/mapp.png')}
          />
          <AppButton
            title="Sociteni"
            onPress={() => {}}
            titleStyle={styles.button_text}
            style={styles.sociteni_button_background}
            icon={generateOcticon('location', 20, '#d4d6d4')}
          />
          <AppButton
            onPress={() => {}}
            style={styles.menu_button_background}
            title={generateAntDesignIcon('menu-unfold', 20, '#848784')}
          />
        </View>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          animatedValue={new Animated.Value(80)}
          draggableRange={{top: height / 1.5, bottom: 80}}>
          <View style={styles.slideup_container}>
            <Text style={styles.text}>EXPLORE</Text>

            <AppButton
              onPress={() => {}}
              titleStyle={styles.commenting_button_text}
              style={styles.commenting_button_background}
              title={generateFontistoIcon('commenting', 20, 'white')}
            />
          </View>
        </SlidingUpPanel>
      </SafeAreaView>
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
    shadowOpacity: 0.8,
    paddingVertical: 6,
    position: 'absolute',
    paddingHorizontal: 12,
    shadowColor: '#bbbfbb',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
  },
  button_text: {
    fontSize: 16,
    color: 'grey',
  },
  menu_button_background: {
    top: 20,
    right: 20,
    paddingVertical: 6,
    position: 'absolute',
    backgroundColor: 'transparent',
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
    shadowColor: 'orange',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderBottomRightRadius: 0,
    shadowOffset: {width: 0, height: 4},
  },
  commenting_button_text: {
    transform: [{scaleX: -1}, {rotate: '0deg'}],
  },
});

export default App;
