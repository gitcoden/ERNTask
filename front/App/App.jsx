import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Typography } from '@material-ui/core/es';

import routes from './routes';
import Default from './Default';

const App = () => (
  <React.Fragment>
    <Route path="/" component={({ location: { pathname } }) => <Default currentTab={pathname} />} />
    <Switch>
      {routes.map(route => (
        <Route
          path={route.path}
          component={() => (
            <Typography component="div">
              <route.component />
            </Typography>
          )}
          key={route.uiId}
        />
      ))}
    </Switch>
  </React.Fragment>
);

export default App;
