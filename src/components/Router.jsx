/* eslint-disable react/forbid-prop-types, jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';
import readme from '../../README.md';
import { nextView, prevView, setViews, goToView } from '../actions';
import viewContainers from '../containers';

class Router extends React.Component {
  componentWillMount() {
    this.props.setViews(viewContainers.map(v => v.key));
  }

  renderActiveViews = activeViews => (
    activeViews.map((activeViewKey) => {
      const element = viewContainers.find(v => (
        activeViewKey.includes(v.key)
      ));
      const View = element.Component;

      return <View key={activeViewKey} uniqueKey={activeViewKey} />;
    })
  )

  renderLinks = () => (
    viewContainers.map(v => (
      <button onClick={() => this.props.goToView(v.key)} key={v.key}>
        {v.key}
      </button>
    ))
  )

  renderActiveViewNames =() => (
    this.props.activeViews.map(av => (
      <span key={av}>{av}</span>
    ))
  )

  render() {
    return (
      <div>
        <p>Target: {this.props.targetKey} (Index {this.props.targetIndex})</p>
        <p>ActiveViews: { this.renderActiveViewNames() }</p>
        <p>Transitioning: {`${this.props.transitioning}`}</p>
        <p>
          <button onClick={this.props.prev}>Prev View</button>
          <button onClick={this.props.next}>Next View</button>
          { this.renderLinks() }
        </p>
        <div className="views">
          { this.renderActiveViews(this.props.activeViews) }
        </div>
        <Markdown source={readme} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    next: () => dispatch(nextView()),
    prev: () => dispatch(prevView()),
    goToView: viewName => dispatch(goToView(viewName)),
    setViews: vs => dispatch(setViews(vs)),
  };
}

function mapStateToProps({ router }) {
  return {
    targetKey: router.views[router.targetIndex],
    targetIndex: router.targetIndex,
    activeViews: router.activeViews,
    views: router.views,
    transitioning: router.activeViews.length > 1,
  };
}

Router.defaultProps = {
  targetKey: '',
};

Router.propTypes = {
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  setViews: PropTypes.func.isRequired,
  goToView: PropTypes.func.isRequired,
  activeViews: PropTypes.array.isRequired,
  targetIndex: PropTypes.number.isRequired,
  targetKey: PropTypes.string,
  transitioning: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
