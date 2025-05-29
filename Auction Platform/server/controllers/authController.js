const User = require('../models/User');
const passport = require('passport');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Login user
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(400).json({ message: info.message || 'Login failed' });
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
        });
    })(req, res, next);
};

// Logout user
exports.logout = (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out successfully' });
    });
};