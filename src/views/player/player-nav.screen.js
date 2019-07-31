import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { withTheme } from 'styled-components';

import { RowFlex } from '../../components';

const ModalNavbar = styled.View`
  height: 60;
  height: 60;
  width: 100%;
  flex: 0 60px;
  margin-bottom: 10;
`;
const ModalBackButton = styled.TouchableOpacity`
  width: 60;
  height: 60;
  flex: 0 60px;
  align-items: center;
  justify-content: center;
`;
const ModalMoreButton = styled.TouchableOpacity`
  width: 60;
  height: 60;
  flex: 0 60px;
  align-items: center;
  justify-content: center;
`;

class PlayerNav extends React.PureComponent {
  props: {
    theme: Object,
    onBack: Function,
    onMore: Function,
  };

  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <ModalNavbar>
        <RowFlex>
          <ModalBackButton onPress={this.props.onBack}>
            <Icon
              name="keyboard-arrow-down"
              size={40}
              color={this.props.theme.primaryColor}
            />
          </ModalBackButton>
          <View style={{ flex: 1 }} />
          <ModalMoreButton onPress={this.props.onMore}>
            <Icon
              name="more-horiz"
              size={40}
              color={this.props.theme.primaryColor}
            />
          </ModalMoreButton>
        </RowFlex>
      </ModalNavbar>
    );
  }
}

export default withTheme(PlayerNav);
