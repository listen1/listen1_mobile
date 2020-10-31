/* eslint no-param-reassign: ["error", { "props": false }] */

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TYPE } from './actions';

const ENUM_PLAYMODE = Object.freeze({
  LOOP: 0,
  SHUFFLE: 1,
  REPEAT_ONE: 2,
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function generateShuffleIds(tracks) {
  const newShuffleIds = tracks.map((track) => track.id);

  shuffle(newShuffleIds);

  return newShuffleIds;
}

function safeArrayIndex(array, index) {
  let targetIndex = index;

  if (index < 0) {
    targetIndex = array.length - 1;
  } else if (index >= array.length) {
    targetIndex = 0;
  }

  return array[targetIndex];
}

function getTrackByOffset(state, offset) {
  const index = state.tracks.findIndex(
    (i) => i.id === state.nowplayingTrack.id
  );

  return safeArrayIndex(state.tracks, index + offset);
}

function getShuffleTrackByOffset(state, offset) {
  const shuffleIndex = state.shuffleIds.findIndex(
    (id) => id === state.nowplayingTrack.id
  );

  const nowplayingTrackId = safeArrayIndex(
    state.shuffleIds,
    shuffleIndex + offset
  );
  const trackIndex = state.tracks.findIndex((i) => i.id === nowplayingTrackId);

  return state.tracks[trackIndex];
}

function insertArrayNextToTarget(array, item, target, compareKey) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(array[i]);
    if (compareKey === undefined) {
      if (array[i] === target) {
        result.push(item);
      }
    } else if (array[i][compareKey] === target[compareKey]) {
      result.push(item);
    }
  }

  return result;
}

function next(state, extraState) {
  let extra = extraState;

  if (extra === null) {
    extra = {};
  }
  if (
    state.playMode === ENUM_PLAYMODE.LOOP ||
    state.playMode === ENUM_PLAYMODE.REPEAT_ONE
  ) {
    return {
      ...state,
      isPlaying: true,
      nowplayingTrack: getTrackByOffset(state, 1),
      ...extra,
    };
  } else if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
    return {
      ...state,
      isPlaying: true,
      nowplayingTrack: getShuffleTrackByOffset(state, 1),
      ...extra,
    };
  }

  return { ...state, ...extra };
}
function pause(state) {
  return { ...state, isPlaying: false };
}

export const defaultPlayerState = {
  playMode: 0,
  nowplayingTrack: null,
  volume: 100,
  isPlaying: false,
  duration: 0,
  current: 0,
  seek: 0,
  isSeeking: false,
  tracks: [],
  shuffleIds: [],
  skipIds: {},
};

const playerReducerBase = (state = defaultPlayerState, action) => {
  let index;
  let newPlayMode;
  let newShuffleIds;
  switch (action.type) {
    case TYPE.PLAY:
      return { ...state, isPlaying: true };
    case TYPE.PAUSE:
      return pause(state);
    case TYPE.PLAY_TRACK:
      if (state.tracks.findIndex((i) => i.id === action.track.id) !== -1) {
        return { ...state, isPlaying: true, nowplayingTrack: action.track };
      }

      if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
        return {
          ...state,
          // isPlaying: true,
          nowplayingTrack: action.track,
          tracks: [...state.tracks, action.track],
          shuffleIds: [...state.shuffleIds, action.track.id],
        };
      }

      return {
        ...state,
        // isPlaying: true,
        nowplayingTrack: action.track,
        tracks: [...state.tracks, action.track],
      };
    case TYPE.PLAY_TRACK_IN_PLAYLIST:
      if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
        return {
          ...state,
          nowplayingTrack: action.payload.track,
          tracks: action.payload.playlist.tracks,
          shuffleIds: generateShuffleIds(action.payload.playlist.tracks),
          skipIds: {},
        };
      }

      return {
        ...state,
        nowplayingTrack: action.payload.track,
        tracks: action.payload.playlist.tracks,
        skipIds: {},
      };
    case TYPE.PLAY_TRACKS:
      if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
        newShuffleIds = generateShuffleIds(action.tracks);
        index = state.tracks.findIndex((i) => i.id === newShuffleIds[0]);

        return {
          ...state,
          // isPlaying: true,
          nowplayingTrack: action.tracks[index],
          tracks: action.tracks,
          shuffleIds: newShuffleIds,
          skipIds: {},
        };
      }

      return {
        ...state,
        // isPlaying: true,
        nowplayingTrack: action.tracks[0],
        tracks: action.tracks,
      };
    case TYPE.ADD_NEXT_TRACK:
      if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
        return {
          ...state,
          tracks: insertArrayNextToTarget(
            state.tracks,
            action.payload,
            state.nowplayingTrack,
            'id'
          ),

          shuffleIds: insertArrayNextToTarget(
            state.shuffleIds,
            action.payload.id,
            state.nowplayingTrack.id
          ),
        };
      }

      return {
        ...state,
        tracks: insertArrayNextToTarget(
          state.tracks,
          action.payload,
          state.nowplayingTrack,
          'id'
        ),
      };
    case TYPE.TOGGLE_PLAY:
      return { ...state, isPlaying: !state.isPlaying };
    case TYPE.PREV_TRACK:
      if (
        state.playMode === ENUM_PLAYMODE.LOOP ||
        state.playMode === ENUM_PLAYMODE.REPEAT_ONE
      ) {
        return {
          ...state,
          isPlaying: true,
          nowplayingTrack: getTrackByOffset(state, -1),
        };
      } else if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
        return {
          ...state,
          isPlaying: true,
          nowplayingTrack: getShuffleTrackByOffset(state, -1),
        };
      }

      return { ...state };
    case TYPE.NEXT_TRACK:
      return next(state);
    case TYPE.LOAD_FAIL:
      if (TYPE.playMode === ENUM_PLAYMODE.REPEAT_ONE) {
        return pause(state);
      }
      if (Object.keys(state.skipIds).length >= state.tracks.length) {
        return pause(state);
      }

      return next(state, {
        skipIds: { ...state.skipIds, [state.nowplayingTrack.id]: 1 },
      });

    case TYPE.REMOVE_TRACK:
      if (state.playMode === ENUM_PLAYMODE.SHUFFLE) {
        return {
          ...state,
          tracks: state.tracks.filter((i) => i.id !== action.payload.id),
          shuffleIds: state.shuffleIds.filter((id) => id !== action.payload.id),
        };
      }

      return {
        ...state,
        tracks: state.tracks.filter((i) => i.id !== action.payload.id),
      };

    case TYPE.UPDATE_PLAYER:
      return { ...state, ...action.next };
    case TYPE.CHANGE_PLAY_MODE:
      newPlayMode = (state.playMode + 1) % Object.keys(ENUM_PLAYMODE).length;
      if (newPlayMode === ENUM_PLAYMODE.SHUFFLE) {
        return {
          ...state,
          playMode: newPlayMode,
          shuffleIds: generateShuffleIds(state.tracks),
        };
      }

      return { ...state, playMode: newPlayMode };
    case TYPE.RECOVER_DATA:
      return { ...action.payload.playerState };
    default:
      return state;
  }
};

const playPersistConfig = {
  key: 'playerState',
  storage,
  blacklist: ['isPlaying', 'current', 'progress', 'skipIds'],
};

export const playerReducer = persistReducer(
  playPersistConfig,
  playerReducerBase
);
