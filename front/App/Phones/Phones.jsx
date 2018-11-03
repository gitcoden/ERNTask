import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(state => ({ phones: state.phones }))
class Phones extends React.Component {
  render() {
    const { phones } = this.props;
    return (
      <ul>
        {phones.map(phone => (
          <li key={phone.uiId}>{phone.value}</li>
        ))}
      </ul>
    );
  }
}

Phones.propTypes = {
  phones: PropTypes.arrayOf(PropTypes.string),
};

export default Phones;
