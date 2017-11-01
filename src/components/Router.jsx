/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

class Router extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>Router</div>
    );
  }
}

Router.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Router;
