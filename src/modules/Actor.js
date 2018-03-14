import React, { PureComponent } from 'react';
import { View, Image, Platform } from 'react-native';

export default class Actor extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    touchId: null,
  };
  onTouchStartHandler = e => {
    this.state.touchId = Platform.select({
      web: e.nativeEvent.buttons,
      default: e.nativeEvent.identifier,
    });
    this.props.addTouchHandler(this.state.touchId, this);
    console.log(this.state.touchId, 'start', e.currentTarget);
    console.log(this.state.touchId, 'start', e.nativeEvent);
  };
  onMouseDownHandler = e => {
    this.onTouchStartHandler(e);
  };
  onTouchEndHandler = e => {
    // console.log(this.state.touchId, 'end', e.nativeEvent);
    this.props.removeTouchHandler(this.state.touchId);
    this.state.touchId = null;
  };
  onTouchMoveHandler = e => {
    // console.log(this.state.touchId, 'move', e.nativeEvent);
  };
  render() {
    return (
      <View
        onTouchStart={this.onTouchStartHandler}
        onMouseDown={this.onMouseDownHandler}
        style={{
          width: 30,
          height: 30,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          ...this.props.style,
        }}
      >
        <Image
          draggable={false}
          style={{ width: 30, height: 30 }}
          source={require('../assets/android.png')}
        />
      </View>
    );
  }
}
