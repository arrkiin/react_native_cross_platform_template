import React, { PureComponent } from 'react';
import { Platform, Animated, Easing } from 'react-native';
import glamorous from 'glamorous-native';

const glamorousAnimatedComponentFactory = glamorous(Animated.View);
const AnimatedView = glamorousAnimatedComponentFactory({
  alignContent: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
});
// AnimatedView.defaultProps = { renderToHardwareTextureAndroid: 'true' };
AnimatedView.propsAreStyleOverrides = true;

export default class Rotater extends PureComponent {
  state = {
    scaleValue: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.spring(this.state.scaleValue, {
          toValue: 10,
          speed: 0.1,
          bounciness: 5,
          useNativeDriver: Platform.select({
            ios: true,
            android: true,
            default: false,
          }),
        }),
        Animated.timing(this.state.scaleValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: Platform.select({
            ios: true,
            android: true,
            default: false,
          }),
        }),
        Animated.delay(2000),
      ])
    ).start();
  }
  render() {
    const scale = this.state.scaleValue.interpolate({
      inputRange: [0, 10],
      outputRange: [0.01, 0.8],
    });
    return (
      <AnimatedView
        style={{
          transform: [{ scale: scale }],
        }}
      >
        {this.props.children}
      </AnimatedView>
    );
  }
}
