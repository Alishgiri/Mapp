import React from 'react';
import {View} from 'react-native';
import BackButton from '../components/BackButton';

class Profile extends React.Component {
  render() {
    return (
      <View>
        <BackButton componentId={this.props.componentId} />
      </View>
    );
  }
}

export default Profile;
