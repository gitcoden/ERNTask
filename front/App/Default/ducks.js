import { error, success } from 'react-notification-system-redux';

const defaultNotificationOpts = {
  autoDismiss: 5,
};

export const showError = message => dispatch => {
  dispatch(
    error({
      ...defaultNotificationOpts,
      message,
      title: 'Error',
    })
  );
};

export const showSuccess = message => dispatch => {
  dispatch(
    success({
      ...defaultNotificationOpts,
      message,
      title: 'Good',
    })
  );
};
