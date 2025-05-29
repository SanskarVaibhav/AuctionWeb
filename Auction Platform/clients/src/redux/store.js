import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import auctionReducer from './reducers/auctionReducer';
import alertReducer from './reducers/alertReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    auction: auctionReducer,
    alert: alertReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
