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
    enum: ['Art', 'Electronics', 'Collectibles', 'Jewelry'],
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
    enum: ['active', 'ended', 'sold'],
    default: 'active' 
  }
}, { timestamps: true });

// Auto-update status when auction ends
auctionSchema.pre('save', function(next) {
  if (this.isModified('endTime') && new Date(this.endTime) < new Date()) {
    this.status = 'ended';
  }
  next();
});

module.exports = mongoose.model('Auction', auctionSchema);