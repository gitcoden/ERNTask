import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';
import Default from './Default';

const App = () => (
  <React.Fragment>
    <Route path="/" component={Default} />
    <Switch>
      {routes.map(route => (
        <Route path={route.path} component={route.component} key={route.uiId} />
      ))}
    </Switch>
  </React.Fragment>
);

export default App;
