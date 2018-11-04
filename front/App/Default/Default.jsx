import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core/es';
import Notifications from 'react-notification-system-redux';
import { connect } from 'react-redux';

import routes from 'front/App/routes';

@connect(state => ({ notifications: state.notifications }))
class Default extends React.Component {
  render = () => {
    const { currentTab, notifications } = this.props;
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
        <Notifications notifications={notifications} />
      </AppBar>
    );
  };
}

Default.propTypes = {
  currentTab: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
  notifications: PropTypes.array,
};

export default Default;
