import React from 'react';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LApi from '../../api/client';
import {
  playTrackInPlaylist,
  playTracks,
  createMyPlaylist,
  openModalLite,
} from '../../redux/actions';
import { Flex, RowFlex, TrackRow, AImage } from '../../components';
import { showToast } from '../../modules/toast';

const PlaylistHeader = styled(RowFlex)`
  padding: 20px;
`;
const PlaylistHeaderCover = styled(AImage)`
  width: 120;
  height: 120;
  flex: 0 120px;
`;
const PlaylistHeaderTitle = styled.Text`
  flex: 1;
  margin-left: 10;
  color: ${(props) => props.theme.primaryColor};
  font-size: 16;
`;
const ControlButton = styled.TouchableOpacity`
  width: 180;
  height: 40;
  font-size: 26;
  flex-direction: row;
  align-items: center;
`;
const PlaceHolder = styled(RowFlex)`
  align-items: center;
  justify-content: center;
`;
class Playlist extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      headerTintColor: screenProps.theme.primaryColor,
      headerStyle: { backgroundColor: screenProps.theme.windowColor },
    };
  };
  props: {
    navigation: Object,
    dispatch: Function,
    theme: Object,
    myPlaylistState: Object,
    playerState: Object,
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});

    if (item.info.id.startsWith('my')) {
      this.state = {
        // tracks: this.props.myPlaylistState.myPlaylistDict[item.info.id].tracks,
        // info: item.info,
        id: item.info.id,
        loading: true,
      };
    } else {
      this.state = {
        id: item.info.id,
        tracks: [],
        info: item.info,
        loading: true,
      };
    }
    this.onPressRow = this.onPressRow.bind(this);
    this.popup = this.popup.bind(this);
  }

  componentDidMount() {
    if (this.isMyPlaylist()) {
      this.setState({ loading: false });
      return;
    }
    this.setState({ loading: true });
    LApi.getPlaylist(this.state.id).then((r) => {
      if (this.state.info.cover_img_url !== undefined) {
        this.setState({ tracks: r.tracks, loading: false });
      } else {
        this.setState({ tracks: r.tracks, info: r.info, loading: false });
      }
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.isMyPlaylist()) {
      if (
        this.getCurrentPlaylist().tracks !==
        nextProps.myPlaylistState.myPlaylistDict[this.state.id].tracks
      ) {
        return true;
      }
    } else if (this.state.tracks !== nextState.tracks) {
      return true;
    }
    if (
      this.props.playerState.nowplayingTrack !==
      nextProps.playerState.nowplayingTrack
    ) {
      return true;
    }

    return false;
  }

  onPressRow(item) {
    if (item.disabled) {
      return showToast('平台版权原因无法播放，请尝试其它平台');
    }
    let playlist = null;

    if (this.isMyPlaylist()) {
      playlist = this.getCurrentPlaylist();
    } else {
      playlist = { ...this.state };
    }

    return this.props.dispatch(playTrackInPlaylist({ track: item, playlist }));
    // open modal player when click track
    // this.props.dispatch(toggleModal());
  }
  getCurrentPlaylist() {
    return this.props.myPlaylistState.myPlaylistDict[this.state.id];
  }
  popup(item) {
    this.props.dispatch(openModalLite({ height: 350, type: 'track', item }));
  }
  _keyExtractor = (item) => item.id;
  isMyPlaylist() {
    return this.state.id.startsWith('my');
  }
  render() {
    let info;
    let tracks;

    if (this.isMyPlaylist()) {
      info = this.getCurrentPlaylist().info;
      tracks = this.getCurrentPlaylist().tracks;
    } else {
      info = this.state.info;
      tracks = this.state.tracks;
    }
    // console.log(`render ${this.constructor.name}`);

    return (
      <Flex style={{ backgroundColor: this.props.theme.backgroundColor }}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <Flex>
                <PlaylistHeader>
                  <PlaylistHeaderCover source={info.cover_img_url || ''} />
                  <PlaylistHeaderTitle>{info.title || ''}</PlaylistHeaderTitle>
                </PlaylistHeader>
                {this.state.loading === true && (
                  <PlaceHolder>
                    <ActivityIndicator color="#777777" />
                  </PlaceHolder>
                )}
                {this.state.loading === false && (
                  <RowFlex style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <ControlButton
                      style={{ flex: 1 }}
                      onPress={() => this.props.dispatch(playTracks(tracks))}
                    >
                      <Icon
                        name="play-circle-outline"
                        size={26}
                        color={this.props.theme.primaryColor}
                      />

                      <Text
                        style={{
                          marginLeft: 10,
                          color: this.props.theme.primaryColor,
                        }}
                      >
                        {`播放全部(共${tracks.length}首)`}
                      </Text>
                    </ControlButton>
                    {this.isMyPlaylist() ? (
                      <ControlButton
                        style={{ flex: 0, flexBasis: 100 }}
                        onPress={() => {
                          this.props.navigation.navigate('ReOrder', {
                            type: 'playlist',
                            playlist: { info, tracks },
                          });
                        }}
                      >
                        <Icon
                          name="reorder"
                          size={26}
                          color={this.props.theme.primaryColor}
                        />

                        <Text
                          style={{
                            marginLeft: 10,
                            color: this.props.theme.primaryColor,
                          }}
                        >
                          编辑歌单
                        </Text>
                      </ControlButton>
                    ) : (
                      <ControlButton
                        style={{ flex: 0, flexBasis: 100 }}
                        onPress={() => {
                          this.props.dispatch(
                            createMyPlaylist({ info, tracks })
                          );
                          showToast('收藏成功');
                        }}
                      >
                        <Icon
                          name="add-box"
                          size={26}
                          color={this.props.theme.primaryColor}
                        />

                        <Text
                          style={{
                            marginLeft: 10,
                            color: this.props.theme.primaryColor,
                          }}
                        >
                          收藏歌单
                        </Text>
                      </ControlButton>
                    )}
                  </RowFlex>
                )}
              </Flex>
            );
          }}
          data={tracks}
          renderItem={({ item }) => {
            return (
              <TrackRow
                onPress={this.onPressRow}
                item={item}
                onPressIcon={this.popup}
                iconType="more"
                isPlaying={
                  this.props.playerState.nowplayingTrack !== undefined &&
                  this.props.playerState.nowplayingTrack !== null &&
                  item.id === this.props.playerState.nowplayingTrack.id
                }
              />
            );
          }}
          extraData={this.props.playerState.nowplayingTrack}
          keyExtractor={this._keyExtractor}
        />
      </Flex>
    );
  }
}
const mapStateToProps = ({ myPlaylistState, playerState }) => ({
  myPlaylistState,
  playerState,
});

export default connect(mapStateToProps)(withTheme(Playlist));
