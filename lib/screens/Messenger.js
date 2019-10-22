import React from 'react';
import {
  Day,
  Send,
  utils,
  Actions,
  Composer,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import {Navigation} from 'react-native-navigation';
import {View, Text, StyleSheet, Animated, SafeAreaView} from 'react-native';

import {
  generateIonicon,
  generateEntypoIcon,
  generateMaterialIcon,
  generateFontAwesome5Icon,
} from '../utilities/icon-generator';
import {AppButton} from '../components/ui';
import {
  ORANGE,
  PURPLE,
  PURPLE_LIGHT,
  SHADOW_EFFECT,
} from '../utilities/constants/style-constants';
import MenuButton from '../components/MenuButton';
import {splitDateTime} from '../utilities/handle-date-time';

const {isSameUser, isSameDay} = utils;

class Messenger extends React.Component {
  state = {
    messages: [
      {
        _id: 0,
        text:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        createdAt: new Date(),
        user: {
          _id: 11,
          name: 'StarhekPikni4ek',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 1,
        text:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Stanperk',
          avatar: 'https://placeimg.com/141/141/any',
        },
      },
      {
        _id: 2,
        text:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
        createdAt: new Date(),
        user: {
          _id: 12,
          name: 'Stanperk',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
  };

  constructor(props) {
    super(props);
    this.slideAnimation = new Animated.Value(150);
  }

  onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  _renderSend = props => (
    <Send
      {...props}
      onPress={this.onSend}
      containerStyle={{
        width: 'auto',
        height: 'auto',
      }}>
      <View style={styles.send_button}>
        {generateMaterialIcon('send', 25, 'white')}
      </View>
    </Send>
  );

  _renderBubble = e => {
    console.log(e);
    const {position, nextMessage, currentMessage} = e;
    const fragment = splitDateTime(currentMessage.createdAt);
    if (position === 'left') {
      console.log('<<<<<< Fragment >>>>>>', fragment, currentMessage.createAt);
      return (
        <View style={{maxWidth: '70%'}}>
          <View
            style={{
              padding: 20,
              borderRadius: 30,
              backgroundColor: PURPLE,
              borderBottomLeftRadius: 0,
            }}>
            <Text style={{color: 'white'}}>{currentMessage.text}</Text>
          </View>
          <Text style={{marginTop: 5, color: PURPLE_LIGHT}}>
            {currentMessage.user.name}
            {'  '}
            {fragment.time}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{maxWidth: '70%'}}>
          <View
            style={{
              padding: 20,
              borderRadius: 30,
              borderBottomRightRadius: 0,
              backgroundColor: '#e8eaf1',
            }}>
            <Text style={{color: 'black'}}>{currentMessage.text}</Text>
          </View>
          <Text style={{marginTop: 5, color: PURPLE_LIGHT, textAlign: 'right'}}>
            {fragment.time}
          </Text>
        </View>
      );
    }
  };

  _renderDay = props => {
    const {currentMessage} = props;
    console.log('date', props);
    if (currentMessage.createdAt) {
      const fragment = splitDateTime(currentMessage.createdAt);

      return (
        <Day {...props}>
          <View
            style={{
              padding: 10,
              width: 'auto',
              borderRadius: 30,
              alignSelf: 'center',
              backgroundColor: 'white',
            }}>
            <Text>{fragment.shortDate}</Text>
          </View>
        </Day>
      );
    }
    return null;
  };

  _renderChatFooter = props => {
    return (
      <View
        style={{
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 40,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 100,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: PURPLE,
            justifyContent: 'center',
            borderBottomLeftRadius: 0,
          }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: 'white',
            }}
          />
        </View>
        <AppButton
          style={{
            width: 60,
            height: 60,
            ...SHADOW_EFFECT,
            borderRadius: 30,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
          title={generateMaterialIcon('keyboard-arrow-down', 30, PURPLE)}
        />
        <View style={{width: 100}} />
      </View>
    );
  };

  // _scrollToBottomComponent = () => {
  //   return (
  //     <AppButton
  //       style={{
  //         width: 60,
  //         height: 60,
  //         ...SHADOW_EFFECT,
  //         borderRadius: 30,
  //         alignItems: 'center',
  //         backgroundColor: 'white',
  //       }}
  //       title={generateMaterialIcon('keyboard-arrow-down', 30, PURPLE)}
  //     />
  //   );
  // };

  _renderActions = props => {
    return (
      <Actions
        {...props}
        containerStyle={{
          marginLeft: 0,
          marginBottom: 0,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={() => generateFontAwesome5Icon('plus', 20, PURPLE)}
      />
    );
  };

  _renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          height: 100,
          borderRadius: 50,
          ...SHADOW_EFFECT,
          shadowRadius: 8,
          paddingLeft: 20,
          paddingRight: 10,
          borderTopWidth: 0,
          marginHorizontal: 20,
          alignItems: 'center',
          backgroundColor: 'white',
          justifyContent: 'center',
          shadowOffset: {width: 0, height: 0},
        }}
      />
    );
  };

  _renderComposer = props => {
    return (
      <Composer
        {...props}
        placeholderTextColor={PURPLE_LIGHT}
        textInputStyle={{alignSelf: 'center', marginBottom: 0}}
      />
    );
  };

  _onPressActionButton = props => {};

  dismiss = () => {
    Navigation.pop(this.props.componentId);
  };

  slideOpen = () => {
    Animated.timing(this.slideAnimation, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  slideClose = () => {
    Animated.timing(this.slideAnimation, {
      toValue: 150,
      duration: 350,
    }).start();
  };

  render() {
    const animation = {transform: [{translateX: this.slideAnimation}]};
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <GiftedChat
            alwaysShowSend={true}
            scrollToBottom={true}
            minInputToolbarHeight={100}
            renderDay={this._renderDay}
            renderSend={this._renderSend}
            messages={this.state.messages}
            renderBubble={this._renderBubble}
            showAvatarForEveryMessage={false}
            placeholder="Type your message..."
            renderActions={this._renderActions}
            renderComposer={this._renderComposer}
            renderChatFooter={this._renderChatFooter}
            onSend={messages => this.onSend(messages)}
            renderInputToolbar={this._renderInputToolbar}
            scrollToBottomStyle={styles.scroll_to_bottom}
            onPressActionButton={this._onPressActionButton}
            // scrollToBottomComponent={this._scrollToBottomComponent}
            user={{_id: 0, avatar: 'https://placeimg.com/150/150/any'}} // who is sending the message
          />
          <AppButton
            onPress={this.dismiss}
            style={styles.back_button}
            title={generateIonicon('ios-arrow-round-back', 35)}
          />
          <View style={{top: 0, right: 0, position: 'absolute'}}>
            <MenuButton style={styles.menu_button} onPress={this.slideOpen} />
            <Animated.View
              style={[
                {
                  top: 20,
                  right: 0,
                  padding: 10,
                  ...SHADOW_EFFECT,
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                },
                animation,
              ]}>
              <AppButton
                onPress={this.slideClose}
                title={generateEntypoIcon('cross')}
                style={{paddingBottom: 5, justifyContent: 'flex-end'}}
              />
              <AppButton
                title="Leave Chat"
                onPress={this.slideClose}
                style={{padding: 10, justifyContent: 'flex-start'}}
              />
              <AppButton
                onPress={this.slideClose}
                title="Profile & Settings"
                style={{padding: 10, justifyContent: 'flex-start'}}
              />
              <AppButton
                title="Logout"
                onPress={this.slideClose}
                style={{padding: 10, justifyContent: 'flex-start'}}
              />
            </Animated.View>
          </View>
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
  backgroundColor: '#f8f8f8',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  back_button: {
    left: 0,
    ...common_button_style,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  menu_button: {
    right: 0,
    ...common_button_style,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  send_button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    ...SHADOW_EFFECT,
    shadowColor: ORANGE,
    alignItems: 'center',
    backgroundColor: ORANGE,
    justifyContent: 'center',
  },
  scroll_to_bottom: {
    left: '45%',
    alignSelf: 'center',
  },
});

export default Messenger;
