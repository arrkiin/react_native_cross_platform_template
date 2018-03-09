import React, { PureComponent } from 'react';
import { Platform, Animated, Image, StyleSheet } from 'react-native';
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

const NORMAL = require('../assets/react.png');
const TOUCHED = require('../assets/react1.png');

export default class Spawn extends PureComponent {
  state = {
    touched: false,
  };
  touch() {
    console.log('spawn touched');
    this.setState({ touched: true });
  }
  untouch() {
    this.setState({ touched: false });
  }
  render() {
    const scale = this.props.scaleValue.interpolate({
      inputRange: [0, 10],
      outputRange: [0.01, 0.8],
    });
    return (
      <AnimatedView
        onStartShouldSetResponder={() => false}
        pointerEvents="none"
        id="test"
        {...Platform.select({ web: { pointerEvents: 'none' } })}
        style={{
          transform: [{ scale: scale }],
        }}
      >
        <Image
          id="image"
          draggable={false}
          style={styles.image2}
          ref={ref => (this.image = ref)}
          source={this.state.touched ? TOUCHED : NORMAL}
        />
      </AnimatedView>
    );
  }
}

const styles = StyleSheet.create({
  image2: {
    width: 50,
    height: 50,
  },
});
