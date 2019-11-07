import React, {Component} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

import Circle from './Cirlcle';
import {getDimentions, ORANGE} from '../../utilities/constants/style-constants';

class CircleWithWave extends Component {
  constructor(props) {
    super(props);
    this.scale1 = new Animated.Value(1);
    this.scale2 = new Animated.Value(1);
    this.fade1 = new Animated.Value(1);
    this.fade2 = new Animated.Value(1);
  }

  componentDidMount() {
    this.hold = false;
    this.animate();
  }

  animate = () => {
    Animated.timing(this.scale1, {
      toValue: 3.5,
      duration: 3000,
    }).start(() => {
      Animated.parallel([
        Animated.timing(this.fade1, {
          toValue: 0,
          duration: 2000,
        }),
        Animated.timing(this.scale2, {
          toValue: 3.5,
          duration: 3000,
        }),
      ]).start(() => {
        Animated.timing(this.fade2, {
          toValue: 0,
          duration: 1500,
        }).start(() => {
          if (this.hold) {
            setTimeout(() => {
              this.hold = true;
              this.restartAnimation();
            }, 2000);
          } else {
            this.hold = false;
            this.restartAnimation();
          }
        });
      });
    });
  };

  restartAnimation = () => {
    this.fade1.setValue(1);
    this.fade2.setValue(1);
    this.scale1.setValue(1);
    this.scale2.setValue(1);
    this.animate();
  };

  render() {
    const {displayPeople} = this.props;
    const animation1 = {opacity: this.fade1, transform: [{scale: this.scale1}]};
    const animation2 = {
      opacity: this.fade2,
      transform: [{scale: this.scale2}],
    };
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.scaling_circle, animation1]} />
        <Animated.View style={[styles.scaling_circle, animation2]} />
        <Circle size={50} title={displayPeople} sub="people" />
        <Circle
          size={6}
          color={ORANGE}
          style={styles.spreadTo(-50, null, null, null)}
        />
        <Circle size={4} style={styles.spreadTo(0, -30, null, null)} />
        <Circle
          size={4}
          color={ORANGE}
          style={styles.spreadTo(null, -35, -20, null)}
        />
        <Circle size={6} style={styles.spreadTo(null, null, -40, -10)} />
        <Circle size={6} style={styles.spreadTo(null, null, null, -35)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: getDimentions().height / 6,
  },
  spreadTo: function(top, right, bottom, left) {
    return {
      alignSelf: 'center',
      position: 'absolute',
      ...(top ? {top} : {}),
      ...(left ? {left} : {}),
      ...(right ? {right} : {}),
      ...(bottom ? {bottom} : {}),
    };
  },
  scaling_circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default CircleWithWave;
