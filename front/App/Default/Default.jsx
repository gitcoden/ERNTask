import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'front/App/routes';

const Default = () =>
  routes.map(route => (
    <Link to={route.path} key={route.uiId}>
      {route.linkLabel}
    </Link>
  ));

export default Default;
