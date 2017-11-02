/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ViewD = ({ uniqueKey, animationClass, timeToLeave }) => (
  <div className={`view viewD ${animationClass}`}>
    <p>{uniqueKey} {`${timeToLeave}`}</p>
  </div>
);

ViewD.propTypes = {
  animationClass: PropTypes.string.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default ViewD;
