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
import Actor from './modules/Actor';
// import glamorous from 'glamorous-native';
import { getInstanceFromNode } from './utils';

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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Press reload',
});

const SIZE = 30;
const ELEMENTS = 10;
const PADDING = 15;

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
  touches = [];
  state = {
    scaleValue: new Animated.Value(0),
  };
  checkRelease = ({ touches, changedTouches }) => {
    // const releasedTouches = changedTouches
    //   .keys()
    //   .filter(key => !touches.hasOwnProperty(key));
    console.log(
      touches,
      changedTouches,
      changedTouches.filter(obj => {
        return !touches.find(ch => ch.identifier === obj.identifier);
      })
    );
  };
  isLocalEvent = evt => {
    if (
      evt.nativeEvent.locationX < PADDING ||
      evt.nativeEvent.locationY < PADDING ||
      evt.nativeEvent.locationX > SIZE * ELEMENTS + PADDING ||
      evt.nativeEvent.locationY > SIZE * ELEMENTS + PADDING ||
      evt.nativeEvent.locationX === evt.nativeEvent.pageX ||
      evt.nativeEvent.locationY === evt.nativeEvent.pageY
    ) {
      return false;
    }
    return true;
  };
  onPanResponderGrantHandler = (evt, gestureState) => {
    evt.preventDefault();
    if (!this.isLocalEvent(evt)) {
      return;
    }
    console.log(
      'grant',
      parseInt((evt.nativeEvent.locationX - PADDING) / SIZE),
      parseInt((evt.nativeEvent.locationY - PADDING) / SIZE)
    );
  };
  onPanResponderRelease = (evt, gestureState) => {
    evt.preventDefault();
    if (!this.isLocalEvent(evt)) {
      return;
    }
    this.checkRelease(evt.nativeEvent);
    console.log(
      'release',
      parseInt((evt.nativeEvent.locationX - PADDING) / SIZE),
      parseInt((evt.nativeEvent.locationY - PADDING) / SIZE)
    );
  };
  onPanResponderTerminate = (evt, gestureState) => {
    evt.preventDefault();
    if (!this.isLocalEvent(evt)) {
      return;
    }
    console.log(
      'terminate',
      parseInt((evt.nativeEvent.locationX - PADDING) / SIZE),
      parseInt((evt.nativeEvent.locationY - PADDING) / SIZE)
    );
  };
  onPanResponderMoveHandler = (evt, gestureState) => {
    evt.preventDefault();
    if (!this.isLocalEvent(evt)) {
      return;
    }
    this.checkRelease(evt.nativeEvent);
    // for (let key in evt.nativeEvent.touches) {
    //   console.log(
    //     'move',
    //     evt.nativeEvent.changedTouches[key].identifier,
    //     parseInt(
    //       (evt.nativeEvent.changedTouches[key].locationX - PADDING) / SIZE
    //     ),
    //     parseInt(
    //       (evt.nativeEvent.changedTouches[key].locationY - PADDING) / SIZE
    //     )
    //   );
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
      onPanResponderTerminationRequest: (evt, gestureState) => true,
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
    // this.loop();
  }
  loop = time => {
    console.log(time);
    requestAnimationFrame(this.loop);
  };
  shouldHavePointerEvents = () => {
    return Platform.OS === 'web' ? { pointerEvents: 'none' } : {};
  };
  field = {};
  getPosition = (x, y) => {
    console.log({
      top: y * SIZE - SIZE / 2,
      left: x * SIZE - SIZE / 2,
    });
    return {
      top: y * SIZE + PADDING,
      left: x * SIZE + PADDING,
    };
  };
  mouseMoveHandler = null;
  mouseUpHandler = null;
  setMouseMoveHandler = handler => {
    this.mouseMoveHandler = handler;
  };
  setMouseUpHandler = handler => {
    this.mouseUpHandler = handler;
  };
  onMouseMoveHandler = event => {
    if (this.mouseMoveHandler) {
      this.mouseMoveHandler(event);
    }
  };
  onMouseUpHandler = event => {
    if (this.mouseUpHandler) {
      this.mouseUpHandler(event);
    }
  };
  get_grid() {
    let grid = Array.from({ length: ELEMENTS }, (_, i) => i).map(row => (
      <View
        {...this.shouldHavePointerEvents()}
        style={styles.rowView}
        id="row"
        key={'row_' + row}
      >
        {Array.from({ length: ELEMENTS }, (_, i) => row + i).map(col => (
          <View
            {...this.shouldHavePointerEvents()}
            style={styles.colView}
            key={'field_' + col}
          >
            <Spawn
              pointerEvents="none"
              ref={ref => (this.field['col_' + col] = ref)}
              scaleValue={this.state.scaleValue}
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
      <View>
        <View
          style={{
            width: 30 * ELEMENTS + 2 * PADDING,
            height: 30 * ELEMENTS + 2 * PADDING,
            position: 'absolute',
            top: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
            left: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
          }}
          // {...this.panResponder.panHandlers}
        >
          <View style={{ padding: PADDING, backgroundColor: 'lightslategray' }}>
            {grid}
          </View>
        </View>
        <View
          style={{
            width: 30 * ELEMENTS + 2 * PADDING,
            height: 30 * ELEMENTS + 2 * PADDING,
            position: 'absolute',
            top: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
            left: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
          }}
          onMouseMove={this.onMouseMoveHandler}
          onMouseUp={this.onMouseUpHandler}
        >
          <Actor
            name="first"
            setMouseMoveHandler={this.setMouseMoveHandler}
            setMouseUpHandler={this.setMouseUpHandler}
            style={{ position: 'absolute', ...this.getPosition(2, 1) }}
          />
          <Actor
            name="second"
            setMouseMoveHandler={this.setMouseMoveHandler}
            setMouseUpHandler={this.setMouseUpHandler}
            style={{ position: 'absolute', ...this.getPosition(6, 4) }}
          />
        </View>
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
