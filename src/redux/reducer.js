import { combineReducers } from 'redux';

import { TYPE } from './actions';
import { myPlaylistReducer } from './myplaylist.reducer';
import { playerReducer } from './player.reducer';

const modalReducer = (
  state = {
    isOpen: false,
    isLiteOpen: false,
    liteHeight: 500,
    liteType: '',
    item: {},
  },
  action
) => {
  switch (action.type) {
    case TYPE.TOGGLE_MODAL:
      return { ...state, isOpen: !state.isOpen };
    case TYPE.OPEN_MODEL_LITE:
      return {
        ...state,
        isLiteOpen: true,
        liteHeight: action.payload.height || 500,
        liteType: action.payload.type || '',
        item: action.payload.item || {},
      };
    case TYPE.CLOSE_MODEL_LITE:
      return { ...state, isLiteOpen: false };
    default:
      return state;
  }
};

const settingReducer = (
  state = { language: 'zh_CN', theme: 'white' },
  action
) => {
  switch (action.type) {
    case TYPE.CHANGE_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};

const searchReducer = (state = { text: '' }, action) => {
  switch (action.type) {
    case TYPE.SEARCH:
      return { ...state, text: action.text };
    default:
      return state;
  }
};

export default combineReducers({
  playerState: playerReducer,
  settingState: settingReducer,
  searchState: searchReducer,
  modalState: modalReducer,
  myPlaylistState: myPlaylistReducer,
});
