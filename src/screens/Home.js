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
  TextInput,
} from 'react-native';
import Actor from '../modules/Actor';
// import glamorous from 'glamorous-native';

import Spawn from '../modules/Spawn';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

const SIZE = 30;
const ELEMENTS = 10;
const PADDING = 15;

@inject('firstStore')
@observer
export default class HomeScreen extends Component {
  onInputChange = value => {
    this.props.firstStore.data = value;
  };
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
  touchHandler = {};
  addTouchHandler = (touchId, object) => {
    this.touchHandler[touchId] = object;
    console.log(this.touchHandler);
  };
  removeTouchHandler = touchId => {
    this.touchHandler[touchId] = null;
    console.log(touchId, this.touchHandler);
  };
  getTouchHandlerObject = e =>
    (this.state.touchId = Platform.select({
      web: this.touchHandler[1],
      default: this.touchHandler[e.nativeEvent.identifier],
    }));
  onMouseMoveHandler = e => {
    const handlerObject = this.getTouchHandlerObject(e);
    if (handlerObject) {
      handlerObject.onTouchMoveHandler(e);
    }
  };
  onMouseUpHandler = e => {
    const handlerObject = this.getTouchHandlerObject(e);
    if (handlerObject) {
      handlerObject.onTouchEndHandler(e);
    }
  };
  onTouchMoveHandler = e => {
    const handlerObject = this.getTouchHandlerObject(e);
    if (handlerObject) {
      handlerObject.onTouchMoveHandler(e);
    }
  };
  onTouchEndHandler = e => {
    console.log(e.nativeEvent);
    const handlerObject = this.getTouchHandlerObject(e);
    if (handlerObject) {
      handlerObject.onTouchEndHandler(e);
    }
  };
  getTouchHandler = () => {
    return Platform.select({
      web: {
        onMouseMove: this.onMouseMoveHandler,
        onMouseUp: this.onMouseUpHandler,
        onTouchMove: this.onTouchMoveHandler,
        onTouchEnd: this.onTouchEndHandler,
      },
      default: {
        onMouseMove: this.onMouseMoveHandler,
        onMouseUp: this.onMouseUpHandler,
        onTouchMove: this.onTouchMoveHandler,
        onTouchEnd: this.onTouchEndHandler,
      },
    });
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
    return (
      <View
        style={{
          flex: 0,
          width: 30 * ELEMENTS + 2 * PADDING,
          height: 30 * ELEMENTS + 2 * PADDING,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            width: 30 * ELEMENTS + 2 * PADDING,
            height: 30 * ELEMENTS + 2 * PADDING,
            position: 'absolute',
            // top: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
            // left: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
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
            // top: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
            // left: 0 - (30 * ELEMENTS + 2 * PADDING) / 2,
          }}
          {...this.getTouchHandler()}
        >
          <Actor
            name="first"
            addTouchHandler={this.addTouchHandler}
            removeTouchHandler={this.removeTouchHandler}
            style={{ position: 'absolute', ...this.getPosition(2, 1) }}
          />
          <Actor
            name="second"
            addTouchHandler={this.addTouchHandler}
            removeTouchHandler={this.removeTouchHandler}
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
  };

  render() {
    let toRender = this.get_grid();
    let button = (
      <View style={{ flex: -1, backgroundColor: 'lightgray' }}>
        <Button
          title="Go to Test screen"
          onPress={() => this.props.navigation.navigate('Test')}
        />
        <TextInput
          onChangeText={this.onInputChange}
          value={this.props.firstStore.data}
        />
      </View>
    );
    // button = null;
    return (
      <View
        style={{ flex: 1, alignItems: 'center', alignContent: 'flex-start' }}
      >
        {toRender}
        {button}
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
