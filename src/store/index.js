import { createStore, applyMiddleware } from 'redux';

// Middleware
import thunk from 'redux-thunk';

// Reducers
import reducers from './reducers';

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
