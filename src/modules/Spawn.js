import React, { PureComponent } from 'react';
import { Platform, Animated, Image, StyleSheet, Text } from 'react-native';
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
    if (this.state.touched) {
      return;
    }
    // console.log('spawn touched');
    this.setState({ touched: true });
  }
  untouch() {
    if (!this.state.touched) {
      return;
    }
    this.setState({ touched: false });
  }
  render() {
    const scale = this.props.scaleValue.interpolate({
      inputRange: [0, 10],
      outputRange: [0.01, 0.8],
    });
    return (
      <Animated.View
        pointerEvents="none"
        style={{
          transform: [{ scale: scale }],
          width: 50,
          height: 50,
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Image
          id="image"
          pointerEvents="none"
          // draggable={false}
          style={styles.image2}
          ref={ref => (this.image = ref)}
          source={this.state.touched ? TOUCHED : NORMAL}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  image2: {
    width: 50,
    height: 50,
    opacity: 1,
  },
});
