import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Redux
import { store } from './store';
import { Provider } from 'react-redux';
// Redux Persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// Styled Component
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

import * as serviceWorker from './serviceWorker';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>{' '}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
