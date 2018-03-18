import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import { material } from 'react-native-typography';

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
        <Text style={material.title}>Simple2 Screen</Text>
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            margin: 10,
          }}
        >
          <Text style={[{ margin: 10 }, material.body2]}>
            {this.props.firstStore.data}
          </Text>
        </View>
        <Button
          title="Go to Simple1"
          onPress={() =>
            this.props.navigation.navigate({
              routeName: 'Drawer',
              action: NavigationActions.navigate({ routeName: 'Simple1' }),
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
