import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
  withCredentials: true,
  autoConnect: false
});

export const connectSocket = (token) => {
  socket.auth = { token };
  socket.connect();
};

export default socket;