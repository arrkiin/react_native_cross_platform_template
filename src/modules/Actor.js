import React, { PureComponent } from 'react';
import { View, Image, Platform } from 'react-native';

export default class Actor extends PureComponent {
  constructor(props) {
    super(props);
  }
  onTouchStartHandler = e => {
    if (Platform.OS === 'w') {
      console.log(e.nativeEvent);
    } else {
      console.log(e.nativeEvent);
    }
  };
  onTouchEndHandler = e => {
    if (Platform.OS === 'w') {
      console.log(e.nativeEvent);
    } else {
      console.log(e.nativeEvent);
    }
  };
  onTouchMoveHandler = e => {
    if (Platform.OS === 'w') {
      console.log(e.nativeEvent);
    } else {
      console.log(e.nativeEvent);
    }
  };
  onMouseDownHandler = e => {
    this.props.setMouseUpHandler(this.onMouseUpHandler);
    this.props.setMouseMoveHandler(this.onTouchMoveHandler);
    this.onTouchStartHandler(e);
  };
  onMouseUpHandler = e => {
    this.props.setMouseUpHandler(null);
    this.props.setMouseMoveHandler(null);
    this.onTouchEndHandler(e);
  };
  render() {
    return (
      <View
        onTouchStart={this.onTouchStartHandler}
        onTouchEnd={this.onTouchEndHandler}
        onTouchMove={this.onTouchMoveHandler}
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
