/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Easing,
  Animated,
  Dimensions,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import stores from './stores';
import Simple1 from './screens/Simple1';
import Simple2 from './screens/Simple2';
import Drawer from './screens/Drawer';
import { material } from 'react-native-typography';

const MyTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [0, 1, 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange,
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange,
  });

  return {
    opacity,
    transform: [{ scaleY }],
  };
};

const MyTransitionSpec = {
  duration: 600,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: MyTransitionSpec,
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps;
      const { index } = scene;
      return MyTransition(index, position);
    },
  };
};

const StackNav = StackNavigator(
  {
    Drawer: {
      screen: Drawer,
      index: 0,
    },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
  }
);

export default class Start extends Component {
  render() {
    console.log(Dimensions.get('window'));
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 100,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gray',
          }}
        >
          <Text style={material.headline}>Test Screen</Text>
        </View>
        <View
          style={{
            overflow: 'hidden',
            width: 500,
            height: 500,
            backgroundColor: 'lightgray',
          }}
        >
          <Provider {...stores}>
            <StackNav />
          </Provider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
