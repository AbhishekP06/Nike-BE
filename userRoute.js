const express = require('express');
const router = express.Router();

const User = require('./models/userModel');
const authMiddleware = require('./authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
        
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            user,
            token
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;