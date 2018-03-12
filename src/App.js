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
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
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

class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Test Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class HomeScreen extends PureComponent {
  state = {
    scaleValue: new Animated.Value(0),
  };
  onPanResponderGrantHandler = (evt, gestureState) => {
    const target = evt.target;
    if (Platform.OS !== 'web') {
      if (this.field[getInstanceFromNode(target).memoizedProps.id]) {
        this.field[getInstanceFromNode(target).memoizedProps.id].touch();
      }
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
      if (this.field[getInstanceFromNode(target).memoizedProps.id]) {
        this.field[getInstanceFromNode(target).memoizedProps.id].untouch();
      }
    }
    for (let field_id in this.field) {
      this.field[field_id].untouch();
    }
  };
  onPanResponderTerminate = (evt, gestureState) => {
    console.log('terminate');
    const target = evt.target;
    if (this.field[evt.nativeEvent.target.id]) {
      this.field[evt.nativeEvent.target.id].untouch();
    }
    if (Platform.OS !== 'web') {
      if (this.field[getInstanceFromNode(target).memoizedProps.id]) {
        this.field[getInstanceFromNode(target).memoizedProps.id].untouch();
      }
    }
  };
  onPanResponderMoveHandler = (evt, gestureState) => {
    if (this.field[evt.nativeEvent.target.id]) {
      this.field[evt.nativeEvent.target.id].touch();
    }
    console.log(gestureState);
    // The most recent move distance is gestureState.move{X,Y}
    // The accumulated gesture distance since becoming responder is
    // gestureState.d{x,y}
    // const target = evt.target;
    // if (Platform.OS !== 'web') {
    //   console.log('onPanResponderMoveHandler', getInstanceFromNode(target));
    //   getInstanceFromNode(target);
    // }
  };
  createPanResponder = () => {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrantHandler,
      onPanResponderMove: this.onPanResponderMoveHandler,
      onPanResponderTerminationRequest: (evt, gestureState) => {
        console.log('terminate');
        // const target = evt.target;
        // if (Platform.OS !== 'web') {
        //   console.log(
        //     'onPanResponderTerminationRequest',
        //     getInstanceFromNode(target)
        //   );
        //   getInstanceFromNode(target);
        // }
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
            <Spawn
              pointerEvents="none"
              ref={ref => (this.field['col_' + col] = ref)}
              scaleValue={this.state.scaleValue}
            />
            <View
              id={'col_' + col}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 30,
                height: 30,
                backgroundColor: 'transparent',
              }}
            />
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
    // grid = (
    //   <View style={styles.colView} id={'col_1'} key={'field_1'}>
    //     <View
    //       style={{ backgroundColor: 'transparent', width: 80, height: 80 }}
    //       id={'col_1'}
    //       key={'col_1'}
    //     >
    //       <Spawn
    //         ref={ref => (this.field['col_1'] = ref)}
    //         scaleValue={this.state.scaleValue}
    //       />
    //     </View>
    //   </View>
    // );
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
    // Animated.loop(
    // Animated.sequence([
    Animated.spring(this.state.scaleValue, {
      toValue: 10,
      speed: 0.1,
      bounciness: 5,
      useNativeDriver: Platform.select({
        ios: true,
        android: true,
        default: false,
      }),
    }).start();
    //   Animated.timing(this.state.scaleValue, {
    //     toValue: 0,
    //     duration: 1000,
    //     easing: Easing.linear,
    //     useNativeDriver: Platform.select({
    //       ios: true,
    //       android: true,
    //       default: false,
    //     }),
    //   }),
    //   Animated.delay(2000),
    // ])
    // ).start();
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
    let button = (
      <Button
        title="Go to Test screen"
        onPress={() => this.props.navigation.navigate('Test')}
      />
    );
    button = null;
    return (
      <View style={styles.container}>
        {toRender}
        {button}
      </View>
    );
  }
}

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

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      index: 0,
    },
    Test: {
      screen: Test,
      index: 1,
    },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
    transitionConfig: TransitionConfiguration,
    onTransitionStart: object => console.log(object, 'start'),
  }
);

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
