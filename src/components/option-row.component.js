import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { withTheme } from 'styled-components';
import { PrimaryText } from './text.component';
import Client from '../api/client';

const ControlRow = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.borderColor};
  height: 50px;
  align-items: center;
`;

class OptionRowClass extends React.PureComponent {
  props: {
    item: Object,
    option: Object,
    onPress: Function,
    theme: Object,
  };
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress = () => {
    this.props.onPress({ action: this.props.option, item: this.props.item });
  };

  render() {
    // console.log(`render ${this.constructor.name}`);
    const { option } = this.props;

    return (
      <ControlRow onPress={this.onPress}>
        <Icon
          name={option.icon}
          size={30}
          color={this.props.theme.primaryColor}
          style={{ marginLeft: 15, marginRight: 15 }}
        />
        <PrimaryText>
          {option.title}{' '}
          {option.key === 'nav_artist' ? ` : ${this.props.item.artist}` : ''}
          {option.key === 'nav_album' ? ` : ${this.props.item.album}` : ''}
          {option.key === 'nav_source'
            ? ` : ${Client.getProviderName(this.props.item.source)}`
            : ''}
        </PrimaryText>
      </ControlRow>
    );
  }
}
export const OptionRow = withTheme(OptionRowClass);
