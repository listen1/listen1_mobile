import { defaultPlayerState } from '../redux/player.reducer';
import { defaultmyPlaylistState } from '../redux/myplaylist.reducer';

function deepCopy(oldObject) {
  return JSON.parse(JSON.stringify(oldObject));
}

export default class StateJsonConvert {
  static getJson(state) {
    const { playerState, myPlaylistState } = state;

    const nowPlayingTrackId =
      playerState.nowPlayingTrack === undefined
        ? '-1'
        : playerState.nowPlayingTrack.id;
    const result = {
      // TODO: support language setting
      language: 'zh_CN',
      'player-settings': {
        playmode: playerState.playMode,
        nowplaying_track_id: nowPlayingTrackId,
        volume: 100,
      },
      'current-playing': playerState.tracks,
      playerlists: myPlaylistState.playlists.map(i => i.id),
    };

    myPlaylistState.playlists.forEach(i => {
      const playlist = myPlaylistState.myPlaylistDict[i.id];

      // fix local image url
      if (!playlist.info.cover_img_url.startsWith('http')) {
        playlist.info.cover_img_url = 'images/mycover.jpg';
      }
      result[i.id] = { ...playlist, is_mine: 1 };
    });

    return result;
  }
  static getState(jsonData) {
    const playerState = deepCopy(defaultPlayerState);
    const myPlaylistState = deepCopy(defaultmyPlaylistState);

    playerState.tracks = jsonData['current-playing'];

    jsonData.playerlists.forEach(playlistId => {
      const playlist = jsonData[playlistId];

      // fix local image url
      if (!playlist.info.cover_img_url.startsWith('http')) {
        playlist.info.cover_img_url = './assets/images/logo.png';
      }
      if (playlistId !== 'myplaylist_favorite') {
        myPlaylistState.playlists.push(playlist.info);
      } else {
        // load favorite ids
        jsonData[playlistId].tracks.forEach(track => {
          myPlaylistState.myFavoriteIds[track.id] = 1;
        });
      }
      myPlaylistState.myPlaylistDict[playlistId] = playlist;
    });

    return { playerState, myPlaylistState };
  }
}
