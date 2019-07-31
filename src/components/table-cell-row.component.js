import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RowFlex } from './flex.component';
import { PrimaryText } from './text.component';

const KeyField = styled(PrimaryText)`
  text-align: left;
`;

const SettingTouchableRow = styled(RowFlex)`
  height: 60px;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.borderColor};
`;

class TableCellRowClass extends React.PureComponent {
  props: {
    onPress: Function,
    title: String,
    theme: Object,
    style: Object,
  };
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{ ...this.props.style }}
      >
        <SettingTouchableRow>
          <KeyField>{this.props.title}</KeyField>

          <Icon
            name="navigate-next"
            size={30}
            color={this.props.theme.secondaryColor}
          />
        </SettingTouchableRow>
      </TouchableOpacity>
    );
  }
}

export const TableCellRow = withTheme(TableCellRowClass);
