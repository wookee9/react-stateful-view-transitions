/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ViewB = ({ uniqueKey, animationClass, timeToLeave, time }) => (
  <div className={`view viewB ${animationClass}`}>
    <p>{uniqueKey} {`${timeToLeave}`}</p>
    <p>Redux time: {time}</p>
    <p>Notice how this value carries on changing even while transitioning</p>
  </div>
);

ViewB.propTypes = {
  animationClass: PropTypes.string.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default ViewB;
