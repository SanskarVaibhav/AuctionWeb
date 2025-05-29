const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

const auctionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  startingBid: { 
    type: Number, 
    required: true 
  },
  currentBid: { 
    type: Number, 
    default: function() { return this.startingBid; } 
  },
  images: [{ 
    type: String 
  }],
  category: { 
    type: String,
    enum: ['Art', 'Electronics', 'Collectibles', 'Jewelry', 'Other'],
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  bids: [bidSchema],
  status: { 
    type: String, 
    enum: ['active', 'ended', 'sold', 'cancelled'],
    default: 'active' 
  }
}, { timestamps: true });

// Auto-update status when auction ends or is saved
auctionSchema.pre('save', function(next) {
  if (this.endTime && new Date(this.endTime) < new Date()) {
    this.status = 'ended';
  }
  next();
});

// Add a method to place a bid
auctionSchema.methods.placeBid = function(bidderId, amount) {
  if (this.status !== 'active') {
    throw new Error('Auction is not active.');
  }
  if (amount <= this.currentBid) {
    throw new Error('Bid must be higher than current bid.');
  }
  this.bids.push({ bidder: bidderId, amount });
  this.currentBid = amount;
  return this.save();
};

module.exports = mongoose.model('Auction', auctionSchema);