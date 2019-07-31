import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';

import LApi from '../../api/client';
import {
  updatePlayer,
  play,
  pause,
  nextTrack,
  prevTrack,
  loadFail,
} from '../../redux/actions';

function isDiffTrack(tr1, tr2) {
  if (tr1 === null || tr2 == null) {
    return tr1 !== tr2;
  }

  return tr1.id !== tr2.id;
}

class BackgroundPlayer extends Component {
  props: {
    playerState: Object,
    dispatch: Function,
  };
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
    url: '',
  };

  componentDidMount() {
    MusicControl.enableBackgroundMode(true);
    const { playerState } = this.props;

    if (playerState.nowplayingTrack !== null) {
      this.doLoadTrack(playerState.nowplayingTrack.id, false);
    }
    MusicControl.on('play', () => {
      this.props.dispatch(play());
    });
    MusicControl.on('pause', () => {
      this.props.dispatch(pause());
    });
    MusicControl.on('nextTrack', () => {
      this.props.dispatch(nextTrack());
    });
    MusicControl.on('previousTrack', () => {
      this.props.dispatch(prevTrack());
    });
  }

  componentWillReceiveProps(nextProps) {
    // detect now playing track change
    const { playerState } = this.props;
    const { playerState: nextPlayerState } = nextProps;

    if (
      isDiffTrack(playerState.nowplayingTrack, nextPlayerState.nowplayingTrack)
    ) {
      if (nextPlayerState.nowplayingTrack !== null) {
        this.doLoadTrack(nextPlayerState.nowplayingTrack.id, true);
      }
    }
    if (
      playerState.seek !== undefined &&
      playerState.seek !== nextPlayerState.seek
    ) {
      this.video.seek(nextPlayerState.seek);
    }
    if (playerState.isPlaying !== nextPlayerState.isPlaying) {
      MusicControl.enableControl('play', !nextPlayerState.isPlaying);
      MusicControl.enableControl('pause', nextPlayerState.isPlaying);
      MusicControl.enableControl('nextTrack', true);
      MusicControl.enableControl('previousTrack', true);
      MusicControl.updatePlayback({
        state: nextPlayerState.isPlaying
          ? MusicControl.STATE_PLAYING
          : MusicControl.STATE_PAUSED,
      });
    }
  }

  onLoad = payload => {
    this.props.dispatch(
      updatePlayer({ current: 0, duration: payload.duration })
    );
    // bug in react-native-music-control lib
    // show artwork in android system will cause OOM, so disable it for further fix
    MusicControl.setNowPlaying({
      title: this.props.playerState.nowplayingTrack.title,
      artwork:
        Platform.OS === 'android'
          ? ''
          : this.props.playerState.nowplayingTrack.img_url,
      artist: this.props.playerState.nowplayingTrack.artist,
      album: this.props.playerState.nowplayingTrack.album,
      duration: payload.duration,
    });
  };

  onProgress = payload => {
    const { duration } = this.props.playerState;

    MusicControl.updatePlayback({
      elapsedTime: payload.currentTime,
    });

    this.props.dispatch(
      updatePlayer({
        current: payload.currentTime,
        progress: payload.currentTime / duration,
      })
    );
  };

  onEnd = () => {
    // this.setState({ paused: true });
    if (this.props.playerState.playMode === 2) {
      this.video.seek(0);
    } else {
      this.props.dispatch(nextTrack());
    }
  };

  onSeek = payload => {
    const { currentTime } = payload;

    this.props.dispatch(
      updatePlayer({ isSeeking: false, current: currentTime })
    );
  };

  onAudioBecomingNoisy = () => {
    this.props.dispatch(pause());
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    if (this.props.playerState.isPlaying && !event.hasAudioFocus) {
      this.props.dispatch(pause());
    }
  };
  video: Video;
  doLoadTrack(trackId, shouldPlay) {
    const self = this;

    self.setState({ url: '' });
    LApi.bootstrapTrack(trackId).then(url => {
      if (url === '') {
        // resource not available

        self.props.dispatch(loadFail());

        return;
      }
      self.setState({ url });
      if (shouldPlay) {
        self.props.dispatch(play());
      }
    });
  }
  render() {
    const { url } = this.state;
    const { playerState } = this.props;

    return url ? (
      <Video
        ref={(ref: Video) => {
          this.video = ref;
        }}
        source={{ uri: this.state.url }}
        style={{ width: 0, height: 0 }}
        rate={this.state.rate}
        paused={!playerState.isPlaying}
        volume={this.state.volume}
        muted={this.state.muted}
        resizeMode={this.state.resizeMode}
        progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
        onLoad={this.onLoad} // Callback when video loads
        onProgress={this.onProgress} // Callback every ~250ms with currentTime
        onEnd={this.onEnd}
        onSeek={this.onSeek}
        repeat={false}
        ignoreSilentSwitch="ignore"
        playInBackground // Audio continues to play when app entering background.
        playWhenInactive // [iOS] Video continues to play when control or notification center are shown.
        onAudioBecomingNoisy={this.onAudioBecomingNoisy} // Callback when audio is becoming noisy - should pause video
        onAudioFocusChanged={this.onAudioFocusChanged} // Callback when audio focus has been lost - pause if focus has been lost
      />
    ) : null;
  }
}

const mapStateToProps = ({ playerState }) => ({
  playerState,
});

export default connect(mapStateToProps)(BackgroundPlayer);
