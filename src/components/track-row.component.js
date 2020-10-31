import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlaylistItem = styled(TouchableOpacity)`
  padding-left: 10;
  padding-right: 10;
  padding-top: 7;
  padding-bottom: 7;
  flex-direction: row;
  height: 50px;
`;
const PlaylistInfo = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
`;
const PlaylistControl = styled.TouchableOpacity`
  flex: 0 40px;
  align-items: center;
  justify-content: center;
`;
const PlaylistStatus = styled.TouchableOpacity`
  flex: 0 20px;
  align-items: center;
  justify-content: center;
`;

const PlaylistItemSongTitle = styled.Text`
  font-size: 14;
  color: ${(props) => props.theme.primaryColor};
  overflow: hidden;
`;
const PlaylistItemSongInfo = styled.Text`
  font-size: 12;
  color: ${(props) => props.theme.secondaryColor};
  overflow: hidden;
`;

export class TrackRowClass extends React.PureComponent {
  props: {
    item: Object,
    onPress: Function,
    theme: Object,
    iconType: String,
    onPressIcon: Function,
    isPlaying: Boolean,
  };
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onPressIcon = this.onPressIcon.bind(this);
  }
  onPress = () => {
    this.props.onPress(this.props.item);
  };
  onPressIcon = () => {
    this.props.onPressIcon(this.props.item);
  };
  getStyle = () => {
    if (this.props.isPlaying) {
      return { color: this.props.theme.playingColor };
    }
    if (this.props.item.disabled) {
      return { color: this.props.theme.disableColor };
    }

    return {};
  };
  render() {
    const textStyle = this.getStyle();

    return (
      <PlaylistItem onPress={this.onPress}>
        {this.props.isPlaying ? (
          <PlaylistStatus>
            <Icon
              name="volume-up"
              size={20}
              color={this.props.theme.playingColor}
            />
          </PlaylistStatus>
        ) : null}
        <PlaylistInfo>
          <PlaylistItemSongTitle numberOfLines={1} style={textStyle}>
            {this.props.item.title}
          </PlaylistItemSongTitle>
          <PlaylistItemSongInfo numberOfLines={1} style={textStyle}>
            {this.props.item.artist} - {this.props.item.album}
          </PlaylistItemSongInfo>
        </PlaylistInfo>
        <PlaylistControl onPress={this.onPressIcon}>
          <Icon
            name={this.props.iconType === 'more' ? 'more-vert' : 'close'}
            size={20}
            color={this.props.theme.thirdColor}
          />
        </PlaylistControl>
      </PlaylistItem>
    );
  }
}
export const TrackRow = withTheme(TrackRowClass);
