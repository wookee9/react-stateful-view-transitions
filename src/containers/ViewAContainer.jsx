/* global requestAnimationFrame:true */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeView } from '../actions';
import ViewA from '../views/ViewA';

class ViewAContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      animation: '',
    };
  }

  componentDidMount() {
    // This nested RAF is a bit of a hack, but necessary in order to effect
    // the enter animation using a CSS transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ animation: 'enter' });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.timeToLeave && nextProps.timeToLeave) {
      this.animateOut();
    }
  }

  animateOut = () => {
    this.setState({ animation: 'leave' });
    this.timeout = setTimeout(this.removeView, 500);
  }

  removeView = () => {
    this.props.dispatch(removeView(this.props.uniqueKey));
  }

  render() {
    return <ViewA {...this.props} animationClass={this.state.animation} />;
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mapStateToProps({ router }) {
  const targetKey = router.views[router.targetIndex];

  return {
    timeToLeave: targetKey !== 'ViewA',
  };
}

ViewAContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAContainer);
