module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Join specific auction room
    socket.on('joinAuction', ({ auctionId, userId }) => {
      socket.join(auctionId);
      console.log(`User ${userId} joined auction room: ${auctionId}`);
      io.to(auctionId).emit('userJoined', { userId, auctionId });
    });

    // Handle bid events
    socket.on('placeBid', async (data) => {
      try {
        const { auctionId, amount, userId } = data;
        // You can add bid validation or database logic here
        io.to(auctionId).emit('newBid', { 
          amount,
          bidder: userId,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.error('Socket error:', err);
        socket.emit('bidError', { message: 'Failed to place bid.' });
      }
    });

    socket.on('leaveAuction', ({ auctionId, userId }) => {
      socket.leave(auctionId);
      console.log(`User ${userId} left auction room: ${auctionId}`);
      io.to(auctionId).emit('userLeft', { userId, auctionId });
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};