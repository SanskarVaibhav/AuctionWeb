const Auction = require('../models/Auction');
const { io } = require('../server');

// Create new auction
exports.createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endTime, images, category } = req.body;

    const auction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid, // Ensure currentBid is initialized
      endTime,
      images,
      category,
      seller: req.user.id,
      status: 'active', // Ensure status is set
      bids: [] // Ensure bids array is initialized
    });

    await auction.save();
    res.status(201).json(auction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Place bid (with Socket.io integration)
exports.placeBid = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ error: 'Auction not found' });

    // Check if auction has ended
    if (auction.status !== 'active' || new Date() > new Date(auction.endTime)) {
      auction.status = 'ended';
      await auction.save();
      return res.status(400).json({ error: 'Auction has ended' });
    }

    // Validate bid amount
    if (typeof req.body.amount !== 'number' || req.body.amount <= auction.currentBid) {
      return res.status(400).json({ error: 'Bid must be higher than current bid' });
    }

    // Add bid
    auction.currentBid = req.body.amount;
    auction.bids.push({
      bidder: req.user.id,
      amount: req.body.amount,
      time: new Date()
    });

    await auction.save();

    // Emit real-time update
    io.to(auction._id.toString()).emit('bidUpdate', {
      auctionId: auction._id,
      newBid: req.body.amount,
      bidder: req.user.id
    });

    res.json(auction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};