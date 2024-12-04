const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
    console.log("Logging in...");
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ Username: username, Password: password });
        if (user) {
            console.log(`User ${username} found!`);
            const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10000h' });
            user.AccessToken = jwtToken;
            await user.save();
            res.json({ jwtToken });
        }
        else {
            console.log("No user found!");
            res.json({ message: "No user found!" });
        }
    }
    catch (error) {
        console.log("No user found!");
        res.json({ message: "No user found!" });
    }
});

router.get('/users/all', authenticateToken, async (req, res) => {
    console.log("Getting users...");
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weapon levels' });
    }
});

router.get('/users/get/:username', authenticateToken, async (req, res) => {
    const username = req.params.username;
    console.log(`Getting user "${username}"...`);
    try {
        const user = await User.findOne({ Username: username });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weapon levels' });
    }
});

router.post('/users/create', authenticateToken, async (req, res) => {
    console.log("Creating users...");
    try {
        const {
            username,
            password,
            name,
        } = req.body;
        const user = new User({ Name: name, Username: username, Password: password });
        await user.save();
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weapon levels' });
    }
});

router.post('/users/delete/:username', authenticateToken, async (req, res) => {
    const username = req.params.username;
    console.log(`Getting user "${username}"...`);
    try {
        const user = await User.findOne({ Username: username });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weapon levels' });
    }
});

module.exports = router;