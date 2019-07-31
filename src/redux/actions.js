export const TYPE = {
  PLAY_TRACK: 'PLAY_TRACK',
  TOGGLE_PLAY: 'TOGGLE_PLAY',
  UPDATE_PLAYER: 'UPDATE_PLAYER',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  OPEN_MODEL_LITE: 'OPEN_MODEL_LITE',
  CLOSE_MODEL_LITE: 'CLOSE_MODEL_LITE',
  PREV_TRACK: 'PREV_TRACK',
  NEXT_TRACK: 'NEXT_TRACK',
  PLAY_TRACKS: 'PLAY_TRACKS',
  PLAY_TRACK_IN_PLAYLIST: 'PLAY_TRACK_IN_PLAYLIST',
  ADD_NEXT_TRACK: 'ADD_NEXT_TRACK',
  LOAD_FAIL: 'LOAD_FAIL',
  REMOVE_TRACK: 'REMOVE_TRACK',
  SEARCH: 'SEARCH',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  CHANGE_THEME: 'CHANGE_THEME',
  CHANGE_PLAY_MODE: 'CHANGE_PLAY_MODE',
  CREATE_MY_PLAYLIST: 'CREATE_MY_PLAYLIST',
  SAVE_MY_PLAYLISTS: 'SAVE_MY_PLAYLISTS',
  EDIT_MY_PLAYLIST: 'EDIT_MY_PLAYLIST',
  ADD_TO_MY_PLAYLIST: 'ADD_TO_MY_PLAYLIST',
  ADD_TO_MY_FAVORITE: 'ADD_TO_MY_FAVORITE',
  REMOVE_FROM_MY_FAVORITE: 'REMOVE_FROM_MY_FAVORITE',
  RECOVER_DATA: 'RECOVER_DATA',
};

export const playTrack = track => ({
  type: TYPE.PLAY_TRACK,
  track,
});

export const togglePlay = () => ({
  type: TYPE.TOGGLE_PLAY,
});

export const play = () => ({
  type: TYPE.PLAY,
});

export const pause = () => ({
  type: TYPE.PAUSE,
});

export const updatePlayer = next => ({
  type: TYPE.UPDATE_PLAYER,
  next,
});

export const toggleModal = () => ({
  type: TYPE.TOGGLE_MODAL,
});

export const openModalLite = payload => ({
  type: TYPE.OPEN_MODEL_LITE,
  payload,
});

export const closeModalLite = () => ({
  type: TYPE.CLOSE_MODEL_LITE,
});

export const prevTrack = () => ({
  type: TYPE.PREV_TRACK,
});

export const nextTrack = () => ({
  type: TYPE.NEXT_TRACK,
});

export const addNextTrack = payload => ({
  type: TYPE.ADD_NEXT_TRACK,
  payload,
});
export const removeTrack = payload => ({
  type: TYPE.REMOVE_TRACK,
  payload,
});
export const playTracks = tracks => ({
  type: TYPE.PLAY_TRACKS,
  tracks,
});
export const playTrackInPlaylist = payload => ({
  type: TYPE.PLAY_TRACK_IN_PLAYLIST,
  payload,
});
export const loadFail = () => ({
  type: TYPE.LOAD_FAIL,
});
export const search = text => ({
  type: TYPE.SEARCH,
  text,
});
export const changeTheme = theme => ({
  type: TYPE.CHANGE_THEME,
  theme,
});
export const changePlayMode = () => ({
  type: TYPE.CHANGE_PLAY_MODE,
});
export const createMyPlaylist = playlist => ({
  type: TYPE.CREATE_MY_PLAYLIST,
  playlist,
});
export const saveMyPlaylists = playlists => ({
  type: TYPE.SAVE_MY_PLAYLISTS,
  playlists,
});
export const editMyPlaylist = playlist => ({
  type: TYPE.EDIT_MY_PLAYLIST,
  playlist,
});
export const addToMyPlaylist = payload => ({
  type: TYPE.ADD_TO_MY_PLAYLIST,
  payload,
});
export const addToMyFavorite = payload => ({
  type: TYPE.ADD_TO_MY_FAVORITE,
  payload,
});
export const removeFromMyFavorite = payload => ({
  type: TYPE.REMOVE_FROM_MY_FAVORITE,
  payload,
});
export const recoverData = payload => ({
  type: TYPE.RECOVER_DATA,
  payload,
});
