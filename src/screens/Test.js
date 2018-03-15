import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('firstStore')
@observer
export default class Test extends React.Component {
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
        <Text>Test Screen</Text>
        <Text>{this.props.firstStore.data}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
