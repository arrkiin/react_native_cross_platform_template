/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import Rotater from './modules/Rotater';
import Shaker from './modules/Shaker';
import SvgRect from './modules/SvgRect';
import Spawn from './modules/Spawn';
import _ from 'lodash';
import glamorous from 'glamorous-native';
import { getInstanceFromNode } from './utils';

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
  state = {
    scaleValue: new Animated.Value(0),
  };
  onPanResponderGrantHandler = (evt, gestureState) => {
    const target = evt.target;
    // The gesture has started. Show visual feedback so the user knows
    // what is happening!
    // gestureState.d{x,y} will be set to zero now
    if (Platform.OS !== 'web') {
      console.log('onPanResponderGrantHandler', getInstanceFromNode(target));
      getInstanceFromNode(target);
    }
    if (this.field[evt.nativeEvent.target.id]) {
      this.field[evt.nativeEvent.target.id].touch();
    }
  };
  onPanResponderRelease = (evt, gestureState) => {
    const target = evt.target;
    if (this.field[evt.nativeEvent.target.id]) {
      this.field[evt.nativeEvent.target.id].untouch();
    }
    if (Platform.OS !== 'web') {
      console.log('onPanResponderRelease', getInstanceFromNode(target));
      getInstanceFromNode(target);
    }
  };
  onPanResponderTerminate = (evt, gestureState) => {
    const target = evt.target;
    if (this.field[evt.nativeEvent.target.id]) {
      this.field[evt.nativeEvent.target.id].untouch();
    }
    if (Platform.OS !== 'web') {
      console.log('onPanResponderTerminate', getInstanceFromNode(target));
      getInstanceFromNode(target);
    }
  };
  onPanResponderMoveHandler = (evt, gestureState) => {
    // The most recent move distance is gestureState.move{X,Y}
    // The accumulated gesture distance since becoming responder is
    // gestureState.d{x,y}
    const target = evt.target;
    if (Platform.OS !== 'web') {
      console.log('onPanResponderMoveHandler', getInstanceFromNode(target));
      getInstanceFromNode(target);
    }
  };
  createPanResponder = () => {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => {
        const target = evt.target;
        if (Platform.OS !== 'web') {
          console.log(
            'onStartShouldSetPanResponder',
            getInstanceFromNode(target)
          );
          getInstanceFromNode(target);
        }
        return false;
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        const target = evt.target;
        if (Platform.OS !== 'web') {
          console.log(
            'onStartShouldSetPanResponderCapture',
            getInstanceFromNode(target)
          );
          getInstanceFromNode(target);
        }
        return true;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderGrant: this.onPanResponderGrantHandler,
      onPanResponderMove: this.onPanResponderMoveHandler,
      onPanResponderTerminationRequest: (evt, gestureState) => {
        const target = evt.target;
        if (Platform.OS !== 'web') {
          console.log(
            'onPanResponderTerminationRequest',
            getInstanceFromNode(target)
          );
          getInstanceFromNode(target);
        }
        return true;
      },
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  };
  componentWillMount() {
    this.createPanResponder();
  }
  componentDidMount() {
    this.startLoop();
  }
  field = {};
  get_grid() {
    let grid = _.range(0, SIZE).map(row => (
      <View style={styles.rowView} id="row" key={'row_' + row}>
        {_.range(row * SIZE, row * SIZE + SIZE).map(col => (
          <View style={styles.colView} key={'field_' + col}>
            <View
              style={{ backgroundColor: '#ffffff', width: 50, height: 50 }}
              id={'col_' + col}
              key={'field_' + col}
            >
              <Spawn
                ref={ref => (this.field['col_' + col] = ref)}
                scaleValue={this.state.scaleValue}
              />
            </View>
          </View>
        ))}
      </View>
    ));
    // grid = (
    //   <Rotater>
    //     <Image
    //       draggable={false}
    //       style={styles.image}
    //       source={require('./assets/react.png')}
    //     />
    //   </Rotater>
    // );
    grid = (
      <View style={styles.colView} id={'col_1'} key={'field_1'}>
        <Spawn
          ref={ref => (this.field['col_1'] = ref)}
          scaleValue={this.state.scaleValue}
        />
      </View>
    );
    return (
      <View
        style={{ width: 30 * SIZE, height: 30 * SIZE, alignSelf: 'center' }}
        {...this.panResponder.panHandlers}
      >
        {grid}
      </View>
    );
  }
  startLoop = () => {
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
  };

  render() {
    let toRender = (
      <React.Fragment>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Rotater>
          <Image style={styles.image} source={require('./assets/react.png')} />
        </Rotater>
        <Spawn scaleValue={this.state.scaleValue}>
          <Image style={styles.image2} source={require('./assets/react.png')} />
        </Spawn>
        <SvgRect />
      </React.Fragment>
    );
    toRender = this.get_grid();
    return <View style={styles.container}>{toRender}</View>;
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
  rowView: {
    flexDirection: 'row',
    width: 300,
    overflow: 'visible',
  },
  colView: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    backgroundColor: 'white',
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
