import { createStore } from 'redux';
import  { reducer, initialState } from './redux';

export const store = createStore(
    reducer,
    initialState,
    window.devToolsExtension && window.devToolsExtension()
  );


export default store;

