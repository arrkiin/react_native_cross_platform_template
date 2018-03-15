import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('firstStore')
@observer
export default class Test extends Component {
  onInputChange = value => {
    this.props.firstStore.data = value;
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'silver',
        }}
      >
        <Text>Simple1 Screen</Text>
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            margin: 10,
          }}
        >
          <TextInput
            style={{
              width: 200,
              margin: 10,
            }}
            onChangeText={this.onInputChange}
            value={this.props.firstStore.data}
          />
        </View>
        <Button
          title="Go to Simple2"
          onPress={() => this.props.navigation.navigate('Simple2')}
        />
      </View>
    );
  }
}