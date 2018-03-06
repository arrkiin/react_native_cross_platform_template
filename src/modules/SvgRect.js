import React, { PureComponent } from 'react';
import { Platform, Animated, Easing } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default class SvgRect extends PureComponent {
  state = {
    dashOffset: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.dashOffset, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.select({
          ios: true,
          android: true,
          default: false,
        }),
        easing: Easing.inOut(Easing.linear),
      })
    ).start();
    this.state.dashOffset.addListener(({ value }) => {
      const width = value * 15;
      this.rect.setNativeProps({ strokeDashoffset: width });
    });
  }
  render() {
    return (
      <Svg height="50" width="100">
        <Rect
          ref={node => (this.rect = node)}
          x="5"
          y="5"
          height="40"
          width="90"
          stroke="black"
          strokeWidth="1"
          fill="cyan"
          strokeDasharray="5 10"
          strokeLinecap="round"
        />
      </Svg>
    );
  }
}
