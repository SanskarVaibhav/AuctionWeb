module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Join specific auction room
    socket.on('joinAuction', (auctionId) => {
      socket.join(auctionId);
      console.log(`User joined auction room: ${auctionId}`);
    });

    // Handle bid events
    socket.on('placeBid', async (data) => {
      try {
        const { auctionId, amount, userId } = data;
        io.to(auctionId).emit('newBid', { 
          amount,
          bidder: userId,
          timestamp: new Date() 
        });
      } catch (err) {
        console.error('Socket error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};