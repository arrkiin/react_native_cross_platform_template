import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';

export default class Actor extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.style);
    return (
      <View
        style={{
          width: 30,
          height: 30,
          alignContent: 'center',
          justifyContent: 'center',
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
