import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';

import Routes from './routes';
import history from './services/history';

import Overlay from '~/components/Overlay';

import { store, persistor } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <Overlay />
          <ToastContainer
            transition={Slide}
            autoClose={2000}
            hideProgressBar={false}
            position="top-center"
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}
