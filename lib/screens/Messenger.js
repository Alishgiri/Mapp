import React from 'react';
import {
  Day,
  Send,
  Actions,
  Composer,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import {Navigation} from 'react-native-navigation';
import {View, StyleSheet, Animated} from 'react-native';

import {
  generateEntypoIcon,
  generateFontAwesome5Icon,
} from '../utilities/icon-generator';
import {setRootToJoinUs} from '../navigation';
import {
  PURPLE,
  OFFWHITE,
  PURPLE_LIGHT,
  SHADOW_EFFECT,
} from '../utilities/constants/style-constants';
import MenuButton from '../components/MenuButton';
import BackButton from '../components/BackButton';
import * as builder from '../components/messenger';
import {AppButton, SafeArea} from '../components/ui';
import {PROFILE_SCREEN} from '../utilities/constants/screen-constants';

class Messenger extends React.Component {
  state = {
    menuWidth: 0,
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

  _renderChatFooter = props => <builder.ChatFooter />;

  _renderBubble = props => <builder.MessageBubble {...props} />;

  _renderDay = props => <builder.DayDisplayer props={props} Component={Day} />;

  _renderSend = props => (
    <builder.SendButton Component={Send} onPress={this.onSend} {...props} />
  );

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

  _renderActions = props => (
    <Actions
      {...props}
      containerStyle={styles.actions_styles}
      icon={() => generateFontAwesome5Icon('plus', 15, PURPLE)}
    />
  );

  _renderInputToolbar = props => (
    <InputToolbar {...props} containerStyle={styles.input_tool_bar} />
  );

  _renderComposer = props => (
    <Composer
      {...props}
      placeholderTextColor={PURPLE_LIGHT}
      textInputStyle={styles.composer_style}
    />
  );

  _onPressActionButton = props => {};

  presentProfileAndSettings = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: PROFILE_SCREEN,
      },
    });
  };

  slideOpen = () => {
    Animated.timing(this.slideAnimation, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  slideClose = () => {
    Animated.timing(this.slideAnimation, {
      toValue: this.state.menuWidth,
      duration: 350,
    }).start();
  };

  render() {
    const {componentId} = this.props;
    const animation = {transform: [{translateX: this.slideAnimation}]};
    return (
      <SafeArea>
        <View style={styles.container}>
          <GiftedChat
            alwaysShowSend={true}
            scrollToBottom={true}
            minInputToolbarHeight={70}
            renderDay={this._renderDay}
            renderSend={this._renderSend}
            messages={this.state.messages}
            renderBubble={this._renderBubble}
            showAvatarForEveryMessage={false}
            placeholder="Type your message..."
            renderActions={this._renderActions}
            renderComposer={this._renderComposer}
            // renderChatFooter={this._renderChatFooter}
            onSend={messages => this.onSend(messages)}
            renderInputToolbar={this._renderInputToolbar}
            scrollToBottomStyle={styles.scroll_to_bottom}
            onPressActionButton={this._onPressActionButton}
            // scrollToBottomComponent={this._scrollToBottomComponent}
            user={{_id: 0, avatar: 'https://placeimg.com/150/150/any'}} // who is sending the message
          />
          <View style={styles.menu_view}>
            <BackButton componentId={componentId} />
            <MenuButton style={styles.menu_button} onPress={this.slideOpen} />
            <Animated.View
              style={[styles.animated_menu, animation]}
              onLayout={({
                nativeEvent: {
                  layout: {width},
                },
              }) => this.setState({menuWidth: width})}>
              <AppButton
                onPress={this.slideClose}
                style={styles.menu_close}
                title={generateEntypoIcon('cross')}
              />
              <AppButton
                title="Leave Chat"
                style={styles.menu_items}
                onPress={() => Navigation.pop(componentId)}
              />
              <AppButton
                style={styles.menu_items}
                title="Profile & Settings"
                onPress={this.presentProfileAndSettings}
              />
              <AppButton
                title="Logout"
                style={styles.menu_items}
                onPress={setRootToJoinUs}
              />
            </Animated.View>
          </View>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: OFFWHITE,
  },

  menu_button: {
    right: 0,
    top: 20,
    ...SHADOW_EFFECT,
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  actions_styles: {
    marginLeft: 0,
    marginBottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  composer_style: {
    marginBottom: 0,
    alignSelf: 'center',
  },
  input_tool_bar: {
    height: 75,
    borderRadius: 50,
    ...SHADOW_EFFECT,
    elevation: 5,
    shadowRadius: 8,
    paddingLeft: 20,
    paddingRight: 10,
    borderTopWidth: 0,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 0},
  },
  scroll_to_bottom: {
    left: '45%',
    alignSelf: 'center',
  },
  menu_view: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  animated_menu: {
    top: 20,
    right: 0,
    padding: 10,
    ...SHADOW_EFFECT,
    position: 'absolute',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menu_items: {
    padding: 10,
    justifyContent: 'flex-start',
  },
  menu_close: {
    justifyContent: 'flex-end',
  },
});

export default Messenger;
