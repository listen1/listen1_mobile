import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { withTheme } from 'styled-components';
import {
  closeModalLite,
  playTrack,
  removeTrack,
  openModalLite,
  addToMyPlaylist,
  addNextTrack,
} from '../../redux/actions';
import { ModalLite } from '../../components';
import PlaylistPopup from '../playlist/playlist-popup.screen';
import TrackPopup from '../playlist/track-popup.screen';
import AddToPlaylistPopup from '../playlist/add-to-playlist-popup.screen';
import { showToast } from '../../modules/toast';

class ModalLiteContainer extends React.Component {
  props: {
    modalState: Object,
    dispatch: Function,
    playerState: Object,
    theme: Object,
  };
  constructor(props) {
    super(props);
    this.onPressTrackControl = this.onPressTrackControl.bind(this);
    this.onPressAddToPlaylist = this.onPressAddToPlaylist.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onPressRemoveItem = this.onPressRemoveItem.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (
      this.props.modalState.isLiteOpen === nextProps.modalState.isLiteOpen &&
      this.props.modalState.liteType === 'nowplaying'
    ) {
      return true;
    }
    if (
      this.props.modalState.isLiteOpen === nextProps.modalState.isLiteOpen &&
      this.props.modalState.liteType === nextProps.modalState.liteType
    ) {
      return false;
    }

    return true;
  }
  onPressTrackControl(option) {
    if (option.action.key === 'add_to_playlist') {
      this.props.dispatch(
        openModalLite({
          height: 500,
          type: 'add_to_playlist',
          item: option.item,
        })
      );
    } else if (option.action.key === 'next_to_play') {
      this.props.dispatch(addNextTrack(option.item));
      this.props.dispatch(closeModalLite());
      showToast('已加入下一首播放');
    }
  }
  onPressAddToPlaylist(event) {
    this.props.dispatch(addToMyPlaylist(event));
    this.props.dispatch(closeModalLite());
    showToast('添加歌单完成');
  }
  onOpened = () => {
    if (this.props.modalState.liteType === 'nowplaying') {
      this.playlistPopupRef.scrollToCurrent();
    }
  };
  onClose = () => {
    this.props.dispatch(closeModalLite());
  };
  onPressItem = item => {
    if (item.disabled) {
      return showToast('平台版权原因无法播放，请尝试其它平台');
    }

    return this.props.dispatch(playTrack(item));
  };
  onPressRemoveItem = item => {
    this.props.dispatch(removeTrack(item));
  };
  render() {
    // console.log(`render ${this.constructor.name}`);

    return (
      <ModalLite
        isVisible={this.props.modalState.isLiteOpen}
        duration={200}
        modalHeight={this.props.modalState.liteHeight}
        backgroundColor={this.props.theme.windowColor}
        onClose={this.onClose}
        onOpened={this.onOpened}
      >
        {this.props.modalState.liteType === '' ? (
          <View style={{ flex: 1 }} />
        ) : null}
        {this.props.modalState.liteType === 'nowplaying' ? (
          <PlaylistPopup
            ref={ref => {
              this.playlistPopupRef = ref;
            }}
            tracks={this.props.playerState.tracks}
            onPressItem={this.onPressItem}
            onClose={this.onClose}
            onPressRemoveItem={this.onPressRemoveItem}
            nowPlayingTrackId={
              this.props.playerState.nowplayingTrack === null
                ? ''
                : this.props.playerState.nowplayingTrack.id
            }
          />
        ) : null}

        {this.props.modalState.liteType === 'track' ? (
          <TrackPopup
            item={this.props.modalState.item}
            onClose={this.onClose}
            onPress={this.onPressTrackControl}
          />
        ) : null}
        {this.props.modalState.liteType === 'add_to_playlist' ? (
          <AddToPlaylistPopup
            item={this.props.modalState.item}
            onClose={this.onClose}
            onPress={this.onPressAddToPlaylist}
          />
        ) : null}
      </ModalLite>
    );
  }
}
const mapStateToProps = ({ modalState, playerState }) => ({
  modalState,
  playerState,
});

export default connect(mapStateToProps)(withTheme(ModalLiteContainer));
