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
      endTime,
      images,
      category,
      seller: req.user.id
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

    if (auction.status !== 'active') {
      return res.status(400).json({ error: 'Auction has ended' });
    }

    if (req.body.amount <= auction.currentBid) {
      return res.status(400).json({ error: 'Bid must be higher than current bid' });
    }

    auction.currentBid = req.body.amount;
    auction.bids.push({
      bidder: req.user.id,
      amount: req.body.amount
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