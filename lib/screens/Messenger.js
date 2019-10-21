import React from 'react';
import {Navigation} from 'react-native-navigation';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

import {
  generateIonicon,
  generateMaterialIcon,
} from '../utilities/icon-generator';
import {AppButton} from '../components/ui';
import {
  ORANGE,
  OFFWHITE,
  LIGHT_GREY,
  SHADOW_EFFECT,
  PURPLE,
} from '../utilities/constants/style-constants';
import MenuButton from '../components/MenuButton';

class Messenger extends React.Component {
  state = {
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  };

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  _renderSend = props => (
    <Send {...props} onPress={this.onSend}>
      <View style={styles.send_button}>
        {generateMaterialIcon('send', 25, 'white')}
      </View>
    </Send>
  );

  _renderBubble = m => {
    console.log(m);
    const {position, nextMessage, currentMessage} = m;
    if (position === 'left') {
      return (
        <View
          style={{
            padding: 20,
            borderRadius: 30,
            backgroundColor: PURPLE,
            borderBottomLeftRadius: 0,
          }}>
          <Text style={{color: 'white'}}>{currentMessage.text}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            padding: 20,
            borderRadius: 30,
            borderBottomRightRadius: 0,
            backgroundColor: LIGHT_GREY,
          }}>
          <Text style={{color: 'black'}}>{nextMessage.text}</Text>
        </View>
      );
    }
  };

  dismiss = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <GiftedChat
            user={{_id: 1}}
            renderSend={this._renderSend}
            messages={this.state.messages}
            renderBubble={this._renderBubble}
            onSend={messages => this.onSend(messages)}
          />
          <AppButton
            onPress={this.dismiss}
            style={styles.back_button}
            title={generateIonicon('ios-arrow-round-back', 35, LIGHT_GREY)}
          />
          <MenuButton style={styles.menu_button} onPress={() => {}} />
        </View>
      </SafeAreaView>
    );
  }
}

const common_button_style = {
  top: 20,
  ...SHADOW_EFFECT,
  position: 'absolute',
  paddingHorizontal: 20,
  backgroundColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: OFFWHITE,
  },
  back_button: {
    left: 0,
    ...common_button_style,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  menu_button: {
    right: 0,
    ...common_button_style,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  send_button: {
    width: 60,
    height: 60,
    margin: 10,
    paddingLeft: 3,
    borderRadius: 30,
    ...SHADOW_EFFECT,
    shadowColor: ORANGE,
    alignItems: 'center',
    backgroundColor: ORANGE,
    justifyContent: 'center',
  },
});

export default Messenger;
