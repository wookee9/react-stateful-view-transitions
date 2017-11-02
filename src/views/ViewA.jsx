/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ViewA = ({ uniqueKey, animationClass, timeToLeave }) => (
  <div className={`view viewA ${animationClass}`}>
    <p>{uniqueKey}</p>
    <p>Time To Leave: {`${timeToLeave}`}</p>
    <p>This view uses a CSS Transition, which means it can be interrupted.</p>
  </div>
);

ViewA.propTypes = {
  animationClass: PropTypes.string.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default ViewA;
