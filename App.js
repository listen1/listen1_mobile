import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { Text } from 'react-native';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './Routes';
import reducer from './src/redux/reducer';

// Note: Playground provide quick environment for testing component
// replace `<Routes/>` with component for testing

// import SortPlayground from './src/views/dev/sort-playground.screen';
// import ModalPlayground from './src/views/dev/modal-playground.screen';
// import NetworkPlayground from './src/views/dev/network-playground.screen';
// import ToastPlayground from './src/views/dev/toast-playground.screen';

// TODO: timeout setting not working in debug mode
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['searchState', 'modalState', 'playerState'],
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

// config Text not changed by system font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
