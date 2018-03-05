import React, { Component } from 'react';
import { Platform, Animated, Easing } from 'react-native';

export default class Shaker extends Component {
  state = {
    posModifier: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.posModifier, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: Platform.select({
            ios: true,
            android: true,
            default: false,
          }),
          // easing: Easing.linear,
        }),
        Animated.timing(this.state.posModifier, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: Platform.select({
            ios: true,
            android: true,
            default: false,
          }),
          // easing: Easing.linear,
        }),
      ])
    ).start();
  }
  render() {
    const modifier = this.state.posModifier.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 50],
    });
    return (
      <Animated.View
        style={{
          transform: [{ translateX: modifier }],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
