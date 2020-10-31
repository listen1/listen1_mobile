import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { RowFlex, ColumnFlex } from '../../components';
import { toggleModal, togglePlay } from '../../redux/actions';
import { miniPlayerSetting } from '../../config/settings';

const MiniBar = styled.View`
  width: 100%;
  height: ${miniPlayerSetting.height + miniPlayerSetting.paddingBottom};
  paddingBottom: ${miniPlayerSetting.paddingBottom}}
  background-color: ${(props) => props.theme.windowColor};
`;
const SongLogo = styled.Image`
  width: ${miniPlayerSetting.height};
  height: ${miniPlayerSetting.height};
  flex: 0 ${miniPlayerSetting.height}px;
`;
const SongInfo = styled(ColumnFlex)`
  align-items: center;
  justify-content: center;
`;
const SongTitle = styled.Text`
  font-size: ${miniPlayerSetting.titleFontSize};
  text-align: center;
  margin-bottom: 3px;
  color: ${(props) => props.theme.primaryColor};
  overflow: hidden;
`;
const ArtistTitle = styled.Text`
  font-size: ${miniPlayerSetting.subtitleFontSize};
  text-align: center;
  color: ${(props) => props.theme.secondaryColor};
  overflow: hidden;
`;
const PlayButton = styled.TouchableOpacity`
  width: ${miniPlayerSetting.height};
  height: ${miniPlayerSetting.height};
  flex: 0 ${miniPlayerSetting.height}px;
  align-items: center;
  justify-content: center;
`;

class MiniPlayer extends React.Component {
  props: {
    playerState: Object,
    dispatch: Function,
    theme: Object,
  };
  shouldComponentUpdate(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      return true;
    }

    return (
      this.props.playerState.nowplayingTrack !==
        nextProps.playerState.nowplayingTrack ||
      this.props.playerState.isPlaying !== nextProps.playerState.isPlaying
    );
  }
  render() {
    const noTrack = this.props.playerState.nowplayingTrack === null;
    const { isPlaying } = this.props.playerState;

    // console.log(`render ${this.constructor.name}`);

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.props.dispatch(toggleModal())}
      >
        <MiniBar>
          <RowFlex>
            <SongLogo
              source={
                noTrack
                  ? require('../../assets/images/logo.png')
                  : { uri: this.props.playerState.nowplayingTrack.img_url }
              }
            />
            <SongInfo>
              <SongTitle numberOfLines={1}>
                {noTrack
                  ? 'Listen 1'
                  : this.props.playerState.nowplayingTrack.title}
              </SongTitle>
              <ArtistTitle numberOfLines={1}>
                {noTrack
                  ? 'Artist'
                  : this.props.playerState.nowplayingTrack.artist}
              </ArtistTitle>
            </SongInfo>

            <PlayButton onPress={() => this.props.dispatch(togglePlay())}>
              <Icon
                name={
                  isPlaying ? 'pause-circle-outline' : 'play-circle-outline'
                }
                size={30}
                color={this.props.theme.primaryColor}
              />
            </PlayButton>
          </RowFlex>
        </MiniBar>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ playerState }) => ({
  playerState,
});

export default connect(mapStateToProps)(withTheme(MiniPlayer));
