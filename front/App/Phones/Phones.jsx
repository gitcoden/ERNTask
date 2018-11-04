import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core/es';
import PhoneIcon from '@material-ui/icons/Phone';

@connect(state => ({ phones: state.phones }))
class Phones extends React.Component {
  render() {
    const { phones } = this.props;
    return (
      <List>
        {phones.map(phone => (
          <ListItem key={phone.uiId}>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText>{phone.value}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}

Phones.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.string),
};

export default Phones;
