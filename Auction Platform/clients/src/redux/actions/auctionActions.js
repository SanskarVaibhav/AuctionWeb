import axios from 'axios';
import io from 'socket.io-client';
import {
  BID_PLACED,
  BID_ERROR,
  NEW_BID_RECEIVED
} from './types';

// Place bid action
export const placeBid = (auctionId, amount) => async (dispatch, getState) => {
  try {
    const { auth: { user } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    };

    const { data } = await axios.post(
      `/api/auctions/${auctionId}/bid`,
      { amount },
      config
    );

    dispatch({
      type: BID_PLACED,
      payload: data
    });

    // Optionally, you can emit a socket event here if needed
    // socket.emit('bidPlaced', data);

  } catch (err) {
    dispatch({
      type: BID_ERROR,
      payload: err.response?.data?.error || 'Bid failed'
    });
  }
};

// Setup socket listeners
let socket;
export const setupSocketListeners = (dispatch) => {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL);

    socket.on('bidUpdate', (data) => {
      dispatch({
        type: NEW_BID_RECEIVED,
        payload: data
      });
    });
  }
};

// Optional: export socket for use elsewhere if needed
export { socket };