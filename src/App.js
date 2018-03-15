/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  PanResponder,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Provider } from 'mobx-react';
import stores from './stores';
import Home from './screens/Home';
import Test from './screens/Test';

// const RowView = glamorous.view({
//   flexDirection: 'row',
//   width: 300,
//   overflow: 'visible',
// });

// const ColView = glamorous.view({
//   width: 30,
//   height: 30,
//   alignItems: 'center',
//   justifyContent: 'center',
//   overflow: 'visible',
// });

const SIZE = 30;
const ELEMENTS = 10;
const PADDING = 15;

let MyTransition = (index, position) => {
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
    // transform: [{ scaleY }],
  };
};

const MyTransitionSpec = {
  duration: 600,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
};

let TransitionConfiguration = () => {
  return {
    transitionSpec: MyTransitionSpec,
    // Define scene interpolation, eq. custom transition
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps;
      const { index } = scene;
      return MyTransition(index, position);
    },
  };
};

const StackNav = StackNavigator(
  {
    Home: {
      screen: Home,
      index: 0,
    },
    Test: {
      screen: Test,
      index: 1,
    },
  },
  {
    initialRouteName: 'Home',
    // mode: 'modal',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
    onTransitionStart: object => console.log(object, 'start'),
  }
);

export default class Start extends React.Component {
  render() {
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
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Test Screen</Text>
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
  rowView: {
    flexDirection: 'row',
    // width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  colView: {
    width: 30,
    height: 30,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  image: {
    width: 200,
    height: 200,
  },
  image2: {
    width: 50,
    height: 50,
  },
});
