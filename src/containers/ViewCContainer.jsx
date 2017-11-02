import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeView } from '../actions';
import ViewC from '../views/ViewC';

class ViewCContainer extends React.Component {
  componentWillMount() {
    this.setState({ animation: 'enter' });
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
    return (
      <ViewC {...this.props} animationClass={this.state.animation} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mapStateToProps({ router }) {
  const targetKey = router.views[router.targetIndex];

  return {
    timeToLeave: targetKey !== 'ViewC',
  };
}

ViewCContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timeToLeave: PropTypes.bool.isRequired,
  uniqueKey: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCContainer);
