import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Slider from 'react-native-slider';
import ModalLiteContainer from './modal-lite-container.screen';
import PlayerControl from './player-control.screen';
import PlayerNav from './player-nav.screen';
import PlayerInfo from './player-info.screen';
import {
  togglePlay,
  toggleModal,
  prevTrack,
  nextTrack,
  updatePlayer,
  openModalLite,
  changePlayMode,
  addToMyFavorite,
  removeFromMyFavorite,
} from '../../redux/actions';

import { colors } from '../../config/colors';
import { AImage } from '../../components';

import { modalPlayerSetting } from '../../config/settings';

const ModalPlayer = styled.View`
  flex: 1 0;
  align-items: center;
  background: ${(props) => props.theme.windowColor};
  padding-top: ${modalPlayerSetting.paddingTop};
  padding-bottom: ${modalPlayerSetting.paddingBottom};
`;

const ModalSongCover = styled(AImage)`
  width: 300;
  height: 300;
  border-radius: 20;
`;

const ModalSongTime = styled.Text`
  width: 50;
  flex: 0 50px;
  text-align: center;
  color: ${(props) => props.theme.secondaryColor};
`;

const transTime = (time) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);

  return `${minute > 10 ? minute : `0${minute}`}:${
    second > 9 ? second : `0${second}`
  }`;
};

const styles = StyleSheet.create({
  sliderBtn: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumb: {
    width: 14,
    height: 14,
    backgroundColor: '#D43C33',
    borderColor: '#000',
    borderWidth: 4,
    borderRadius: 7,
  },
});

class ModalPlayerView extends React.Component {
  props: {
    playerState: Object,
    myPlaylistState: Object,
    dispatch: Function,
  };
  constructor(props) {
    super(props);
    this.state = { progress: 0, isPlaylistOpen: false };
    this.onControlPlayMode = this.onControlPlayMode.bind(this);
    this.onControlPrev = this.onControlPrev.bind(this);
    this.onControlPlay = this.onControlPlay.bind(this);
    this.onControlNext = this.onControlNext.bind(this);
    this.onControlPlaylist = this.onControlPlaylist.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onMore = this.onMore.bind(this);
    this.onFav = this.onFav.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playerState.duration > 0) {
      const progress =
        nextProps.playerState.current / nextProps.playerState.duration;

      if (!nextProps.playerState.isSeeking) {
        this.setState({ progress });
      }
    }
  }
  onControlPlayMode = () => this.props.dispatch(changePlayMode());
  onControlPrev = () => this.props.dispatch(prevTrack());
  onControlPlay = () => this.props.dispatch(togglePlay());
  onControlNext = () => this.props.dispatch(nextTrack());
  onControlPlaylist = () => {
    this.props.dispatch(openModalLite({ height: 500, type: 'nowplaying' }));
  };
  onBack = () => this.props.dispatch(toggleModal());
  onMore = () =>
    this.props.dispatch(
      openModalLite({
        height: 350,
        type: 'track',
        item: this.props.playerState.nowplayingTrack,
      })
    );

  onFav = () => {
    if (this.props.playerState.nowplayingTrack === null) {
      return;
    }
    this.props.dispatch(
      this.getFavStatus()
        ? removeFromMyFavorite(this.props.playerState.nowplayingTrack)
        : addToMyFavorite(this.props.playerState.nowplayingTrack)
    );
  };
  getFavStatus() {
    const { nowplayingTrack } = this.props.playerState;
    const { myFavoriteIds } = this.props.myPlaylistState;
    const noTrack = nowplayingTrack === null;
    let isFav = false;

    if (!noTrack && myFavoriteIds[nowplayingTrack.id] !== undefined) {
      isFav = true;
    }

    return isFav;
  }
  sliderChange = (value) => {
    this.setState({ progress: value });
    const currentTime = this.props.playerState.duration * value;

    this.props.dispatch(updatePlayer({ seek: currentTime }));
  };

  render() {
    const { nowplayingTrack } = this.props.playerState;
    const noTrack = nowplayingTrack === null;

    const isFav = this.getFavStatus();

    // console.log(`render ${this.constructor.name}`);

    return (
      <ModalPlayer>
        <PlayerNav onBack={this.onBack} onMore={this.onMore} />

        <ModalSongCover
          source={
            noTrack ? './assets/images/logo.png' : nowplayingTrack.img_url
          }
        />
        <PlayerInfo
          nowplayingTrack={this.props.playerState.nowplayingTrack}
          isFav={isFav}
          onFav={this.onFav}
        />
        <View style={styles.sliderBtn}>
          <ModalSongTime>
            {transTime(this.props.playerState.current)}
          </ModalSongTime>
          <Slider
            maximumTrackTintColor={colors.black}
            minimumTrackTintColor={colors.theme}
            thumbStyle={styles.thumb}
            trackStyle={{ height: 2 }}
            style={{ flex: 1 }}
            value={this.state.progress}
            onSlidingStart={() => {
              this.props.dispatch(updatePlayer({ isSeeking: true }));
            }}
            onSlidingComplete={(value) => {
              this.sliderChange(value);
            }}
          />
          <ModalSongTime>
            {transTime(this.props.playerState.duration)}
          </ModalSongTime>
        </View>

        <PlayerControl
          isPlaying={this.props.playerState.isPlaying}
          playMode={this.props.playerState.playMode}
          onPlayMode={this.onControlPlayMode}
          onPrev={this.onControlPrev}
          onPlay={this.onControlPlay}
          onNext={this.onControlNext}
          onPlaylist={this.onControlPlaylist}
        />

        <ModalLiteContainer />
      </ModalPlayer>
    );
  }
}

const mapStateToProps = ({ playerState, myPlaylistState }) => ({
  playerState,
  myPlaylistState,
});

export default connect(mapStateToProps)(withTheme(ModalPlayerView));
