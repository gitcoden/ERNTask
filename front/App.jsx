import React from 'react';
import PropTypes from 'prop-types';
// debugger;
class App extends React.Component {
  render() {
    const { log } = this.props;

    if (log) {
      console.log('react!');
    }

    return <div />;
  }
}

App.defaultProps = {
  log: false,
  deb: false,
};

App.propTypes = {
  log: PropTypes.bool,
  deb: PropTypes.bool,
};

export default App;
