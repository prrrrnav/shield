const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register user (only for girl/victim)
exports.registerUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, phone, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed.', error });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed.', error });
    }
};
