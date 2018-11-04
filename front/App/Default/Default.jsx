import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core/es';

import routes from 'front/App/routes';

const Default = ({ currentTab }) => {
  const routeExists = routes.some(route => route.path === currentTab);

  return (
    <AppBar position="static">
      <Tabs value={(routeExists && currentTab) || false}>
        <Tab />
        {routes.map(route => (
          <Tab
            key={route.uiId}
            component={props => (
              <Link to={route.path} {...props}>
                {route.linkLabel}
              </Link>
            )}
            value={route.path}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

Default.propTypes = {
  currentTab: PropTypes.string,
};

export default Default;
