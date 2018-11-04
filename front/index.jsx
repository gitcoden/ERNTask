import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from './App';
import configureStore from './App/reduxStore';

const Router = process.env.mode === 'production' ? BrowserRouter : HashRouter;

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__INITIAL_STATE__);

const WrappedApp = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

if (process.env.mode === 'production') {
  ReactDOM.hydrate(<WrappedApp />, document.getElementById('app'));
} else {
  ReactDOM.render(<WrappedApp />, document.getElementById('app'));
}
