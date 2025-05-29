const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');

// Get all auctions
router.get('/', async (req, res) => {
    try {
        const auctions = await Auction.find().populate('owner', 'username');
        res.json(auctions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get a single auction by ID
router.get('/:id', async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id).populate('owner', 'username');
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        res.json(auction);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create a new auction
router.post('/', async (req, res) => {
    try {
        const auction = new Auction({ ...req.body, owner: req.user._id });
        await auction.save();
        res.status(201).json(auction);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create auction', error: err.message });
    }
});

// Update an auction
router.put('/:id', async (req, res) => {
    try {
        const auction = await Auction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        res.json(auction);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update auction', error: err.message });
    }
});

// Delete an auction
router.delete('/:id', async (req, res) => {
    try {
        const auction = await Auction.findByIdAndDelete(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        res.json({ message: 'Auction deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;