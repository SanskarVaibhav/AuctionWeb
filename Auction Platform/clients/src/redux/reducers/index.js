import { combineReducers } from 'redux';
import authReducer from './authReducer';
import auctionReducer from './auctionReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    auctions: auctionReducer,
    // Add more reducers here if needed
});

export default rootReducer;