/* eslint-disable global-require, no-unused-vars, import/no-named-as-default */
/* global navigator: true */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import { polyfill } from 'es6-promise';
import Router from './components/Router';

require('./styles/styles.scss');

const render = (container) => {
  ReactDOM.render(
    <AppContainer>
      { container }
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(<Router />);

if (module.hot) {
  module.hot.accept('./components/Router', () => {
    // require('./components/Router'); // Necessary fix for React Hot Loader 3 beta 6 to work. See https://github.com/gaearon/react-hot-loader/issues/344
    render(<Router />);
  });
};
