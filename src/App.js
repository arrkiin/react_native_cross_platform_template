/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Animated,
  Easing,
  Text,
  View,
  Image,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Press reload',
});

class Rotater extends Component {
  state = {
    spinValue: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 360,
        duration: 4000,
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

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Rotater>
          <Image style={styles.image} source={require('./assets/react.png')} />
        </Rotater>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
});
