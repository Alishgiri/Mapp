import {debounce} from 'lodash';
import React, {Component} from 'react';
import {Animated, PanResponder} from 'react-native';

class SwipableView extends Component {
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dy}) => {
      if (dy < -10 && Boolean(this.props.onPanUp)) this.swippedUp();
      if (dy > 10 && Boolean(this.props.onPanDown)) this.swippedDown();
    },
  });

  swippedUp = debounce(() => this.props.onPanUp(), 500, {
    leading: true,
    trailing: false,
  });

  swippedDown = debounce(() => this.props.onPanDown(), 500, {
    leading: true,
    trailing: false,
  });

  render() {
    const {style, children, onLayout} = this.props;
    return (
      <Animated.View
        style={style}
        onLayout={onLayout}
        {...this._panResponder.panHandlers}>
        {children}
      </Animated.View>
    );
  }
}

export default SwipableView;
