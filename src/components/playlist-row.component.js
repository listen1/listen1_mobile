import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { RowFlex, ColumnFlex } from './flex.component';
import { PrimaryText } from './text.component';
import { AImage } from './image.component';

const MyPlaylistRow = styled(RowFlex)`
  height: 65;
  align-items: center;
  padding: 0 10px;
`;
const MyPlaylistCover = styled(AImage)`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 5px;
  border-radius: 5px;
`;
const MyPlaylistTitle = styled(PrimaryText)`
  margin-bottom: 5px;
`;

export class PlaylistRow extends React.PureComponent {
  props: {
    item: Object,
    onPress: Function,
  };
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress = () => {
    this.props.onPress(this.props.item);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <MyPlaylistRow>
          <MyPlaylistCover source={this.props.item.cover_img_url} />
          <ColumnFlex>
            <MyPlaylistTitle>{this.props.item.title}</MyPlaylistTitle>
            {/* <SecondaryText>0首</SecondaryText> */}
          </ColumnFlex>
        </MyPlaylistRow>
      </TouchableOpacity>
    );
  }
}
