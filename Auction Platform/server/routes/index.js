const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const auctionRoutes = require('./auctionRoutes');
// Add more route imports as needed

router.use('/auth', authRoutes);
router.use('/auctions', auctionRoutes);
// Add more route uses as needed

module.exports = router;