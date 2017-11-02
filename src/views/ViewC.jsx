/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ViewC = ({ uniqueKey, animationClass, timeToLeave }) => (
  <div className={`view viewC ${animationClass}`}>
    <p>{uniqueKey} {`${timeToLeave}`}</p>
  </div>
);

ViewC.propTypes = {
  animationClass: PropTypes.string.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default ViewC;
