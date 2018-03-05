import React, { Component } from 'react';
import { Platform, Animated, Easing } from 'react-native';

export default class Rotater extends Component {
  state = {
    spinValue: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 360,
        duration: 6000,
        useNativeDriver: Platform.select({
          ios: true,
          android: true,
          default: false,
        }),
        easing: Easing.linear,
      })
    ).start();
  }
  render() {
    let { spinValue } = this.state;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
