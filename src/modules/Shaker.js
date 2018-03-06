import React, { PureComponent } from 'react';
import { Platform, Animated, Easing } from 'react-native';

export default class Shaker extends PureComponent {
  state = {
    posModifier: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.posModifier, {
        toValue: 10,
        duration: 2000,
        useNativeDriver: Platform.select({
          ios: true,
          android: true,
          default: false,
        }),
        easing: Easing.inOut(Easing.linear),
      })
    ).start();
  }
  render() {
    return (
      <Animated.View
        style={{
          marginBottom: 10,
          transform: [
            {
              translateX: this.state.posModifier.interpolate({
                inputRange: [0, 5, 10],
                outputRange: [-50, 50, -50],
              }),
            },
          ],
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
