/* eslint-disable class-methods-use-this */
import { View, Text, Button } from 'react-native';
import React from 'react';
import Toast from 'react-native-root-toast';

export default class ToastPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    // Add a Toast on screen.
    Toast.show('测试信息', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Toast test</Text>
        <Button title="Pressme" onPress={this.onPress} />
      </View>
    );
  }
}
