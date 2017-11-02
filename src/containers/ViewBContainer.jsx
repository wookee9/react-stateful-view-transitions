import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeView, updateTime } from '../actions';
import ViewB from '../views/ViewB';

class ViewBContainer extends React.Component {
  componentWillMount() {
    this.setState({ animation: 'enter' });
  }

  componentDidMount() {
    // Demonstrate how the component keeps updating and receiving props
    // from the store while transitioning in and out of the DOM
    this.clock = setInterval(this.updateClock, 50);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.timeToLeave && nextProps.timeToLeave) {
      this.animateOut();
    }
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  updateClock = () => {
    const time = Date.now();
    this.props.dispatch(updateTime(time));
  }

  animateOut = () => {
    this.setState({ animation: 'leave' });
    this.timeout = setTimeout(this.removeView, 2000);
  }

  removeView = () => {
    this.props.dispatch(removeView(this.props.uniqueKey));
  }

  render() {
    return (
      <ViewB {...this.props} animationClass={this.state.animation} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mapStateToProps({ router, clock }) {
  const targetKey = router.views[router.targetIndex];

  return {
    timeToLeave: targetKey !== 'ViewB',
    time: clock.time,
  };
}

ViewBContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBContainer);
