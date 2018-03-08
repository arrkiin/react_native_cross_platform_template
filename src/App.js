/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Rotater from './modules/Rotater';
import Shaker from './modules/Shaker';
import SvgRect from './modules/SvgRect';
import Spawn from './modules/Spawn';
import _ from 'lodash';
import glamorous from 'glamorous-native';

const RowView = glamorous.view({
  flexDirection: 'row',
  width: 300,
  overflow: 'visible',
});

const ColView = glamorous.view({
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Press reload',
});

const SIZE = 10;

export default class App extends PureComponent {
  get_grid() {
    const grid = _.range(0, SIZE).map(row => (
      <RowView key={'row_' + row}>
        {_.range(row * SIZE, row * SIZE + SIZE).map(col => (
          <ColView key={'col_' + col}>
            <Spawn>
              <Image
                style={styles.image2}
                source={require('./assets/react.png')}
              />
            </Spawn>
          </ColView>
        ))}
      </RowView>
    ));
    return (
      <View
        style={{ width: 30 * SIZE, height: 30 * SIZE, alignSelf: 'center' }}
      >
        {grid}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Rotater>
          <Image style={styles.image} source={require('./assets/react.png')} />
        </Rotater>
        <Spawn>
          <Image style={styles.image2} source={require('./assets/react.png')} />
        </Spawn>
        <SvgRect />
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
  image2: {
    width: 50,
    height: 50,
  },
});
