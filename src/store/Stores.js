import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const middleWare = [ thunk ];

const enhancer = composeWithDevTools(
  applyMiddleware(...middleWare),
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;
