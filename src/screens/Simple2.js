import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('firstStore')
@observer
export default class Test extends Component {
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
        <Text>Simple2 Screen</Text>
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            margin: 10,
          }}
        >
          <Text style={{ margin: 10 }}>{this.props.firstStore.data}</Text>
        </View>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}