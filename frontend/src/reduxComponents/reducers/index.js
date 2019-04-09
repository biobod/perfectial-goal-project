import { combineReducers } from 'redux';

const initialState = {
  some: 1,
};

const appReducer = (state = initialState, action) => ({ ...state });

export default combineReducers({ appReducer });
