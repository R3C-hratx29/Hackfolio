import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const initialState = function(state = [], action) {
    switch (action.type) {
        case 'TEST_REDUX':
            return [...state, action.payload]
        default:
            return state
    }
}
const reducers = combineReducers({
      initialState: initialState
  });

 /* eslint-disable no-underscore-dangle */
const store = createStore(
    reducers,
+typeof window !== 'undefined' &&  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
 /* eslint-enable */

store.dispatch({ type: 'TEST_REDUX', payload: { initialState: 1 } });

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>), document.getElementById('root'));
