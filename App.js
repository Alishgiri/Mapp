import {
  View,
  Text,
  Button,
  Animated,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import SlidingUpPanel from 'rn-sliding-up-panel';
import {generateFontistoIcon} from './lib/utilities/icon-generator';
import {AppButton} from './lib/components/ui';

const {height} = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ebedeb',
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
};

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          title="Show panel"
          style={styles.fab_top_left}
          onPress={() => this._panel.show()}
        />
        <SlidingUpPanel
          draggableRange={{top: height / 1.75, bottom: 70}}
          animatedValue={new Animated.Value(70)}
          ref={c => (this._panel = c)}>
          <View style={styles.slideup_container}>
            <Text style={styles.text}>EXPLORE</Text>

            <AppButton
              onPress={() => this._panel.hide()}
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

export default App;
