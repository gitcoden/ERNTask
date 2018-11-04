import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import phones from '../Phones/ducks';

export default combineReducers({ phones, notifications });
