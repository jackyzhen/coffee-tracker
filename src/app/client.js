import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import 'isomorphic-fetch';
import rootReducer from './reducer';
import getRouter from './routes';


function configureMiddlewares() {
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const createLogger = require('redux-logger');

    const logger = createLogger({
      predicate: (getState, action) => action.type !== 'WINDOW_RESIZE',
      stateTransformer: (state) => {
        const newState = {};

        Object.keys(state).forEach((key) => {
          if (state[key] && state[key].toJS) {
            newState[key] = state[key].toJS();
          } else {
            newState[key] = state[key];
          }
        });

        return newState;
      },
      collapsed: () => true,
    });
    middlewares.push(logger);
  }

  return middlewares;
}

// create Redux store
const middlewares = configureMiddlewares();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    // eslint-disable-next-line no-undef
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    {getRouter(store)}
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('app')
);