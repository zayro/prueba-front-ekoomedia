import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { users } from './users.reducer';

const rootReducer = combineReducers({
    users,
    routing: routerReducer,
});

export default rootReducer;
