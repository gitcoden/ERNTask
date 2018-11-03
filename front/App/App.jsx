import React from 'react';
import { Provider } from 'react-redux';

import store from './reduxStore';
import Phones from './Phones';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  static store = store;

  render() {
    return (
      <Provider store={store}>
        <Phones />
      </Provider>
    );
  }
}

export default App;
