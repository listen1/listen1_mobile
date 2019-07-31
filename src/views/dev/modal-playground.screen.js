import { View, Text, Button } from 'react-native';
import React from 'react';

import { ModalLite } from '../../components';

export default class ModalPlayground extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    this._myRef.toggle();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button title="Me?" onPress={this.onPress} />
        <Text>Background</Text>
        {[...Array(20).keys()].map(i => {
          return <Text>{i}</Text>;
        })}
        <Button title="Me?" onPress={this.onPress} />

        <ModalLite
          duration={300}
          modalHeight={500}
          backgroundColor="#ffffff"
          ref={component => {
            this._myRef = component;
          }}
        >
          <Text>Modal</Text>
          <Button title="Close" onPress={this.onPress} />
        </ModalLite>
      </View>
    );
  }
}
