import { TYPE } from './actions';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

const myFavoritePlaylistInfo = {
  id: 'myplaylist_favorite',
  title: '我喜欢的音乐',
  cover_img_url: './assets/images/logo.png',
};

const myFavoritePlaylist = {
  info: myFavoritePlaylistInfo,
  tracks: [],
};

function handleAddToMyPlaylist(state, action) {
  let newTracks = [];

  if (
    state.myPlaylistDict[action.payload.playlist.id].tracks.filter(
      i => i.id === action.payload.track.id
    ).length > 0
  ) {
    return state;
  }
  newTracks = [
    ...state.myPlaylistDict[action.payload.playlist.id].tracks,
    action.payload.track,
  ];

  if (action.payload.playlist.id === myFavoritePlaylistInfo.id) {
    return {
      ...state,
      myFavoriteIds: { ...state.myFavoriteIds, [action.payload.track.id]: 1 },
      myPlaylistDict: {
        ...state.myPlaylistDict,
        [action.payload.playlist.id]: {
          ...state.myPlaylistDict[action.payload.playlist.id],
          tracks: newTracks,
        },
      },
    };
  }

  return {
    ...state,
    myPlaylistDict: {
      ...state.myPlaylistDict,
      [action.payload.playlist.id]: {
        ...state.myPlaylistDict[action.payload.playlist.id],
        tracks: newTracks,
      },
    },
  };
}

function handleAddToMyFavorite(state, action) {
  const { payload: track } = action;

  // console.log(state.myFavoriteIds, track);

  if (state.myFavoriteIds[track.id] !== undefined) {
    // track already in favorite
    return state;
  }

  if (state.myPlaylistDict[myFavoritePlaylistInfo.id] === undefined) {
    // new created my favorite
    return {
      ...state,
      myFavoriteIds: { [track.id]: 1 },
      playlists: [myFavoritePlaylistInfo, ...state.playlists],
      myPlaylistDict: {
        ...state.myPlaylistDict,
        [myFavoritePlaylistInfo.id]: {
          info: myFavoritePlaylistInfo,
          tracks: [track],
        },
      },
    };
  }

  return handleAddToMyPlaylist(state, {
    payload: { track, playlist: { id: myFavoritePlaylistInfo.id } },
  });
}

function handleRemoveFromMyFavorite(state, action) {
  const { payload: track } = action;

  if (state.myFavoriteIds[track.id] === undefined) {
    // track already not in favorite
    return state;
  }

  const newTracks = state.myPlaylistDict[
    myFavoritePlaylist.info.id
  ].tracks.filter(i => i.id !== track.id);

  return {
    ...state,
    myFavoriteIds: { ...state.myFavoriteIds, [track.id]: undefined },
    myPlaylistDict: {
      ...state.myPlaylistDict,
      [myFavoritePlaylist.info.id]: {
        info: myFavoritePlaylist.info,
        tracks: newTracks,
      },
    },
  };
}

export const defaultmyPlaylistState = {
  myFavoriteIds: {},
  playlists: [myFavoritePlaylistInfo],
  myPlaylistDict: {
    [myFavoritePlaylist.info.id]: myFavoritePlaylist,
  },
};

export const myPlaylistReducer = (state = defaultmyPlaylistState, action) => {
  let newPlaylist;
  let currentKeys;
  let newMyPlaylistDict;
  let newMyFavDict;

  switch (action.type) {
    case TYPE.CREATE_MY_PLAYLIST:
      newPlaylist = { ...action.playlist };

      newPlaylist.info.id = `myplaylist_${guid()}`;

      return {
        ...state,
        playlists: [...state.playlists, newPlaylist.info],
        myPlaylistDict: {
          ...state.myPlaylistDict,
          [newPlaylist.info.id]: newPlaylist,
        },
      };
    case TYPE.SAVE_MY_PLAYLISTS:
      currentKeys = action.playlists.map(i => i.id);

      newMyPlaylistDict = {
        [myFavoritePlaylist.info.id]:
          state.myPlaylistDict[myFavoritePlaylist.info.id],
      };
      currentKeys.forEach(k => {
        newMyPlaylistDict[k] = state.myPlaylistDict[k];
      });

      return {
        ...state,
        myPlaylistDict: newMyPlaylistDict,
        playlists: [
          state.myPlaylistDict[myFavoritePlaylist.info.id].info,
          ...action.playlists,
        ],
      };
    case TYPE.EDIT_MY_PLAYLIST:
      if (action.playlist.info.id === myFavoritePlaylistInfo.id) {
        currentKeys = action.playlist.tracks.map(i => i.id);
        newMyFavDict = {};
        currentKeys.forEach(k => {
          newMyFavDict[k] = 1;
        });
      } else {
        newMyFavDict = state.myFavoriteIds;
      }

      return {
        ...state,
        myFavoriteIds: newMyFavDict,
        myPlaylistDict: {
          ...state.myPlaylistDict,
          [action.playlist.info.id]: { ...action.playlist },
        },
      };
    case TYPE.ADD_TO_MY_PLAYLIST:
      return handleAddToMyPlaylist(state, action);
    case TYPE.ADD_TO_MY_FAVORITE:
      return handleAddToMyFavorite(state, action);
    case TYPE.REMOVE_FROM_MY_FAVORITE:
      return handleRemoveFromMyFavorite(state, action);
    case TYPE.RECOVER_DATA:
      return { ...action.payload.myPlaylistState };
    default:
      return state;
  }
};
