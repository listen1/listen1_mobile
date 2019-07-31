import { View, Text, Button } from 'react-native';
import React from 'react';
import Xiami from '../../api/provider/xiami';

export default class NetworkPlayground extends React.Component {
  state = {
    result: '',
  };
  // eslint-disable-next-line class-methods-use-this
  onPress() {
    Xiami.search('123', 1).then(() => {
      // console.log(r);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Network test</Text>
        <Button title="Pressme" onPress={this.onPress} />
        <Text>{this.state.result}</Text>
      </View>
    );
  }
}
