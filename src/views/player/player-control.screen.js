import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { withTheme } from 'styled-components';

import { RowFlex } from '../../components';

const PlayControlRow = styled(RowFlex)`
  height: 120;
  align-items: center;
  flex: 0 120px;
`;
const ControlButton = styled.TouchableOpacity`
  width: 70;
  height: 70;
  flex: 0 70px;
  align-items: center;
  justify-content: center;
`;
const PlayButton = styled(ControlButton)`
  width: 80;
  height: 80;
  flex: 0 80px;
`;

function getIconByPlaymode(playMode) {
  if (playMode === 0) {
    return 'repeat';
  }
  if (playMode === 1) {
    return 'shuffle';
  }
  if (playMode === 2) {
    return 'repeat-one';
  }

  return '';
}
class PlayerControl extends React.PureComponent {
  props: {
    isPlaying: Boolean,
    playMode: Number,
    onPlayMode: Function,
    onPrev: Function,
    onPlay: Function,
    onNext: Function,
    onPlaylist: Function,
    theme: Object,
  };

  render() {
    const { isPlaying } = this.props;

    // console.log(`render ${this.constructor.name}`);

    return (
      <PlayControlRow>
        <ControlButton onPress={this.props.onPlayMode}>
          <Icon
            name={getIconByPlaymode(this.props.playMode)}
            size={30}
            color={this.props.theme.primaryColor}
          />
        </ControlButton>
        <ControlButton onPress={this.props.onPrev}>
          <Icon
            name="skip-previous"
            size={40}
            color={this.props.theme.primaryColor}
          />
        </ControlButton>
        <PlayButton onPress={this.props.onPlay}>
          <Icon
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
            size={70}
            color={this.props.theme.primaryColor}
          />
        </PlayButton>
        <ControlButton onPress={this.props.onNext}>
          <Icon
            name="skip-next"
            size={40}
            color={this.props.theme.primaryColor}
          />
        </ControlButton>
        <ControlButton onPress={this.props.onPlaylist} title="Playlist">
          <Icon
            name="queue-music"
            size={30}
            color={this.props.theme.primaryColor}
          />
        </ControlButton>
      </PlayControlRow>
    );
  }
}

export default withTheme(PlayerControl);
