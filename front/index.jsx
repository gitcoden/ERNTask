import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

import App from './App';
import configureStore from './App/reduxStore';

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) {
      jssStyles.remove();
    }
  }

  render() {
    return <App />;
  }
}

const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;

// eslint-disable-next-line no-underscore-dangle
const store = configureStore(window.__INITIAL_STATE__);

const generateClassName = createGenerateClassName();

const WrappedApp = () => (
  <JssProvider generateClassName={generateClassName}>
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  </JssProvider>
);

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(<WrappedApp />, document.getElementById('app'));
} else {
  ReactDOM.render(<WrappedApp />, document.getElementById('app'));
}
