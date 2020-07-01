import { createStore } from "redux";

// import the root reducer
import rootReducer from './reducers';

// import default data
import dataUser from './config/users';

export const defaultState = {
    "dataUser": dataUser
};


const store = createStore(
    rootReducer);


export default store;
