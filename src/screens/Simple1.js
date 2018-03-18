import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import { material } from 'react-native-typography';

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
        <Text style={material.title}>Simple1 Screen</Text>
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            margin: 10,
          }}
        >
          <TextInput
            style={[
              {
                width: 200,
                margin: 10,
              },
              material.body2,
            ]}
            onChangeText={this.onInputChange}
            value={this.props.firstStore.data}
          />
        </View>
        <Button
          title="Go to Simple2"
          onPress={() =>
            this.props.navigation.navigate({
              routeName: 'Drawer',
              action: NavigationActions.navigate({ routeName: 'Simple2' }),
            })
          }
        />
        <Button
          title="Go to Drawer"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        />
      </View>
    );
  }
}
