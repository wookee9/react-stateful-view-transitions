/* eslint-disable global-require, no-unused-vars, import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import Router from './components/Router';

require('./styles/styles.scss');

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

window.store = store;

const render = (container) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        { container }
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(<Router />);

if (module.hot) {
  module.hot.accept('./components/Router', () => {
    require('./components/Router'); // Necessary fix for React Hot Loader 3 beta 6 to work. See https://github.com/gaearon/react-hot-loader/issues/344
    render(<Router />);
  });
}
