import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import auctionReducer from './reducers/auctionReducer';
import alertReducer from './reducers/alertReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  auction: auctionReducer,
  alert: alertReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;